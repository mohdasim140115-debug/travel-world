import { ObjectId } from "mongodb";
import { getCollection } from "./mongodb.js";

/* =========================================================
   MONGODB DATA LAYER
   A tiny Prisma-shaped facade over the MongoDB driver so the
   call sites keep reading like `db.hotel.findMany({ where })`.
   One model === one collection, named after the model
   (camelCase): db.hotel -> "hotel", db.indiaZoneCard -> "indiaZoneCard".

   Supported: findMany, findUnique, findFirst, create, createMany,
   update, upsert, delete, deleteMany, count.
   Supported options: where (plain equality), orderBy, select, take, skip.
   Anything fancier should use getCollection() directly.
========================================================= */

// Schema defaults that a caller may legitimately omit on create.
const MODEL_DEFAULTS = {
  booking: { status: "New" },
  hotelBooking: { status: "New" },
  flightBooking: { status: "New" },
  transportBooking: { status: "New" },
  enquiry: { status: "New" },
};

// Models whose schema carries these fields (kept in sync with the old Prisma schema).
const HAS_CREATED_AT = new Set(["package", "destination", "departureCity", "flightRoute", "booking", "hotelBooking", "flightBooking", "transportBooking", "enquiry"]);
const HAS_UPDATED_AT = new Set(["package", "destination", "departureCity", "flightRoute"]);

function toObjectId(value) {
  if (value instanceof ObjectId) return value;
  return typeof value === "string" && ObjectId.isValid(value) ? new ObjectId(value) : value;
}

/** Mongo doc -> app record: `_id` becomes a plain string `id`. */
function fromDoc(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  if (_id === undefined) return rest;
  return { id: _id instanceof ObjectId ? _id.toHexString() : _id, ...rest };
}

/** Prisma-style `where` -> Mongo filter (plain equality only). */
function toFilter(where = {}) {
  const filter = {};
  for (const [key, value] of Object.entries(where)) {
    if (value === undefined) continue;
    filter[key === "id" ? "_id" : key] = key === "id" ? toObjectId(value) : value;
  }
  return filter;
}

/** `{ order: "asc" }` or `[{ a: "asc" }, ...]` -> Mongo sort. */
function toSort(orderBy) {
  if (!orderBy) return undefined;
  const clauses = Array.isArray(orderBy) ? orderBy : [orderBy];
  const sort = {};
  for (const clause of clauses) {
    for (const [key, direction] of Object.entries(clause)) {
      sort[key === "id" ? "_id" : key] = direction === "desc" ? -1 : 1;
    }
  }
  return sort;
}

/** `{ slug: true }` -> Mongo projection (`_id` excluded unless `id` asked for). */
function toProjection(select) {
  if (!select) return undefined;
  const projection = {};
  let wantsId = false;
  for (const [key, value] of Object.entries(select)) {
    if (!value) continue;
    if (key === "id") wantsId = true;
    else projection[key] = 1;
  }
  projection._id = wantsId ? 1 : 0;
  return projection;
}

function withCreateDefaults(model, data) {
  const now = new Date();
  const doc = { ...MODEL_DEFAULTS[model], ...data };
  if (doc.id !== undefined) {
    doc._id = toObjectId(doc.id);
    delete doc.id;
  }
  if (doc.order === undefined) doc.order = 0;
  if (HAS_CREATED_AT.has(model)) doc.createdAt ??= now;
  if (HAS_UPDATED_AT.has(model)) doc.updatedAt = now;
  return doc;
}

/* =========================================================
   BUILD-TIME READ CACHE
   `next build` prerenders 400+ pages, and nearly every one
   re-reads the same collections — the package catalogue, the
   destination list, the thirteen home-content collections.
   That is one Atlas round trip per page per collection, which
   is what makes the Vercel build crawl.

   The database cannot change while a build runs, so each
   distinct read is performed once and replayed. This is gated
   on the build phase: at runtime nothing is cached here, so an
   admin save still reaches the site immediately.
========================================================= */
const IS_BUILD = process.env.NEXT_PHASE === "phase-production-build";
const buildReads = new Map();

function cachedRead(key, run) {
  if (!IS_BUILD) return run();

  let pending = buildReads.get(key);
  if (!pending) {
    pending = run();
    // Next retries a page that failed to prerender; a cached rejection
    // would make every retry fail instantly, so failures are forgotten.
    pending.catch(() => buildReads.delete(key));
    buildReads.set(key, pending);
  }
  return pending;
}

function createModel(model) {
  const collection = () => getCollection(model);
  const readKey = (method, args) => `${model}.${method}:${JSON.stringify(args)}`;

  return {
    async findMany(args = {}) {
      const { where, orderBy, select, take, skip } = args;

      const rows = await cachedRead(readKey("findMany", args), async () => {
        const col = await collection();
        let cursor = col.find(toFilter(where), { projection: toProjection(select) });
        const sort = toSort(orderBy);
        if (sort) cursor = cursor.sort(sort);
        if (skip) cursor = cursor.skip(skip);
        if (take) cursor = cursor.limit(take);
        return (await cursor.toArray()).map(fromDoc);
      });

      // Callers are free to sort the list they get back, so a shared build
      // result is handed out as a copy.
      return IS_BUILD ? rows.slice() : rows;
    },

    async findUnique(args = {}) {
      const { where, select } = args;
      return cachedRead(readKey("findUnique", args), async () => {
        const col = await collection();
        return fromDoc(await col.findOne(toFilter(where), { projection: toProjection(select) }));
      });
    },

    async findFirst(args = {}) {
      const { where, orderBy, select } = args;
      return cachedRead(readKey("findFirst", args), async () => {
        const col = await collection();
        return fromDoc(
          await col.findOne(toFilter(where), { projection: toProjection(select), sort: toSort(orderBy) })
        );
      });
    },

    async count({ where } = {}) {
      const col = await collection();
      return col.countDocuments(toFilter(where));
    },

    async create({ data }) {
      const col = await collection();
      const doc = withCreateDefaults(model, data);
      const result = await col.insertOne(doc);
      return fromDoc({ ...doc, _id: doc._id ?? result.insertedId });
    },

    async createMany({ data }) {
      const col = await collection();
      const docs = data.map((item) => withCreateDefaults(model, item));
      const result = await col.insertMany(docs);
      return { count: result.insertedCount };
    },

    async update({ where, data }) {
      const col = await collection();
      const $set = { ...data };
      delete $set.id;
      if (HAS_UPDATED_AT.has(model)) $set.updatedAt = new Date();
      const doc = await col.findOneAndUpdate(toFilter(where), { $set }, { returnDocument: "after" });
      if (!doc) throw new Error(`[db] ${model}.update: no record matched ${JSON.stringify(where)}`);
      return fromDoc(doc);
    },

    async upsert({ where, create, update }) {
      const col = await collection();
      const existing = await col.findOne(toFilter(where));
      if (existing) {
        const $set = { ...update };
        delete $set.id;
        if (HAS_UPDATED_AT.has(model)) $set.updatedAt = new Date();
        const doc = await col.findOneAndUpdate({ _id: existing._id }, { $set }, { returnDocument: "after" });
        return fromDoc(doc);
      }
      const doc = withCreateDefaults(model, { ...where, ...create });
      const result = await col.insertOne(doc);
      return fromDoc({ ...doc, _id: doc._id ?? result.insertedId });
    },

    async delete({ where }) {
      const col = await collection();
      const doc = await col.findOneAndDelete(toFilter(where));
      if (!doc) throw new Error(`[db] ${model}.delete: no record matched ${JSON.stringify(where)}`);
      return fromDoc(doc);
    },

    async deleteMany({ where } = {}) {
      const col = await collection();
      const result = await col.deleteMany(toFilter(where));
      return { count: result.deletedCount };
    },
  };
}

const modelCache = new Map();

export const db = new Proxy(
  {},
  {
    get(_target, prop) {
      if (typeof prop !== "string" || prop.startsWith("$") || prop === "then") return undefined;
      if (!modelCache.has(prop)) modelCache.set(prop, createModel(prop));
      return modelCache.get(prop);
    },
  }
);

export default db;
