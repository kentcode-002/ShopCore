import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedClient) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(process.env.DATABASE_URL!);
  await client.connect();
  const db = client.db();

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

async function getAuth() {
  const { client, db } = await connectToDatabase();

  return betterAuth({
    database: mongodbAdapter(db, {
      client // This is crucial - pass the client to maintain state
    }),
    emailAndPassword: {
      enabled: true
    }
  });
}

export const auth = await getAuth();
