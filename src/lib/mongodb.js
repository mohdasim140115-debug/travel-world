import { MongoClient } from "mongodb";

/* =========================================================
   MONGODB CONNECTION
   One MongoClient per process, cached on globalThis so that
   Next.js dev hot-reloads do not open a new pool every time.
========================================================= */

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "MONGODB_URI is not set. Add your Atlas connection string to .env, e.g.\n" +
      'MONGODB_URI="mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/travel2?retryWrites=true&w=majority"'
  );
}

const globalForMongo = globalThis;

function createClient() {
  return new MongoClient(uri, { maxPoolSize: 10 });
}

const client = globalForMongo.__mongoClient ?? createClient();
const clientPromise = globalForMongo.__mongoClientPromise ?? client.connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo.__mongoClient = client;
  globalForMongo.__mongoClientPromise = clientPromise;
}

/** Resolves to the app database (name comes from the URI path, or MONGODB_DB). */
export async function getDb() {
  const connected = await clientPromise;
  return process.env.MONGODB_DB ? connected.db(process.env.MONGODB_DB) : connected.db();
}

export async function getCollection(name) {
  const db = await getDb();
  return db.collection(name);
}

export { client, clientPromise };
