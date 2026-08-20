/* =========================================================
   ONE-TIME MIGRATION: dev.db (SQLite/Prisma) -> MongoDB
   Reads every table out of the old Prisma SQLite file and
   writes it to the matching MongoDB collection (PascalCase
   table -> camelCase collection, matching src/lib/db.js).

   Column types are read from prisma/schema.prisma so that
   Json columns are parsed back into real arrays/objects,
   Booleans become true/false and DateTimes become Dates.

   Usage:  node scripts/migrate-sqlite-to-mongo.mjs [--fresh]
     --fresh  drop each collection before inserting
========================================================= */

import "dotenv/config";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { MongoClient } from "mongodb";

const SQLITE_FILE = process.env.SQLITE_FILE ?? "dev.db";
const FRESH = process.argv.includes("--fresh");

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set in .env");

/* ---------- field types from the old Prisma schema ---------- */

function readSchemaTypes() {
  const schema = readFileSync("prisma/schema.prisma", "utf8");
  const models = {};
  const modelBlocks = schema.matchAll(/model\s+(\w+)\s*\{([\s\S]*?)\n\}/g);

  for (const [, modelName, body] of modelBlocks) {
    const fields = {};
    for (const line of body.split("\n")) {
      const match = line.trim().match(/^(\w+)\s+(\w+)(\??)/);
      if (!match) continue;
      const [, name, type] = match;
      if (["model", "generator", "datasource"].includes(name)) continue;
      fields[name] = type;
    }
    models[modelName] = fields;
  }
  return models;
}

const camel = (name) => name.charAt(0).toLowerCase() + name.slice(1);

function convert(value, type) {
  if (value === null || value === undefined) return null;

  switch (type) {
    case "Json":
      if (typeof value !== "string") return value;
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    case "Boolean":
      return Boolean(value);
    case "DateTime":
      return new Date(typeof value === "bigint" ? Number(value) : value);
    case "Int":
      return typeof value === "bigint" ? Number(value) : value;
    case "Float":
      return Number(value);
    default:
      return typeof value === "bigint" ? Number(value) : value;
  }
}

/* ---------- run ---------- */

const schemaTypes = readSchemaTypes();
const sqlite = new DatabaseSync(SQLITE_FILE, { readOnly: true });
const client = new MongoClient(uri);

try {
  await client.connect();
  const db = process.env.MONGODB_DB ? client.db(process.env.MONGODB_DB) : client.db();
  console.log(`Migrating ${SQLITE_FILE} -> ${db.databaseName}\n`);

  const tables = sqlite
    .prepare(
      `SELECT name FROM sqlite_master
       WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma%'
       ORDER BY name`
    )
    .all();

  let total = 0;

  for (const { name: table } of tables) {
    const fields = schemaTypes[table];
    if (!fields) {
      console.log(`  skip  ${table} (not in schema.prisma)`);
      continue;
    }

    const rows = sqlite.prepare(`SELECT * FROM "${table}"`).all();
    const collectionName = camel(table);
    const collection = db.collection(collectionName);

    if (FRESH) await collection.deleteMany({});

    if (rows.length === 0) {
      console.log(`  ----  ${collectionName} (0 rows)`);
      continue;
    }

    const docs = rows.map((row) => {
      const doc = {};
      for (const [column, value] of Object.entries(row)) {
        // The old auto-increment id is dropped; Mongo assigns its own _id.
        if (column === "id" && fields.id === "Int") continue;
        doc[column] = convert(value, fields[column]);
      }
      return doc;
    });

    await collection.insertMany(docs);
    total += docs.length;
    console.log(`  ok    ${collectionName} (${docs.length} rows)`);
  }

  /* Indexes that replace the old Prisma @unique constraints. */
  const uniqueIndexes = {
    package: "slug",
    destination: "slug",
    departureCity: "slug",
    flightRoute: "slug",
    airport: "code",
    airline: "name",
    transportRoute: "slug",
    hotel: "slug",
    indiaListingPackage: "slug",
  };

  for (const [collectionName, field] of Object.entries(uniqueIndexes)) {
    await db.collection(collectionName).createIndex({ [field]: 1 }, { unique: true });
  }
  await db.collection("hotel").createIndex({ citySlug: 1 });
  await db.collection("booking").createIndex({ createdAt: -1 });

  console.log(`\nDone. ${total} documents migrated, indexes created.`);
} finally {
  sqlite.close();
  await client.close();
}
