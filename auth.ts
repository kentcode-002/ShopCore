// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { nextCookies } from "better-auth/next-js";

// const client = new MongoClient(process.env.DATABASE_URL!);
// const db = client.db();

// if (!db) {
//   throw new Error("Failed to connect to the database.");
// }

// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     // Optional: if you don't provide a client, database transactions won't be enabled.
//     client
//   }),
//   emailAndPassword: {
//     enabled: true
//   },
//   plugins: [nextCookies()]
// });

// export { db };

/////////////////////

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

const client = new MongoClient(process.env.DATABASE_URL!);

// Connect lazily — Better Auth will handle the connection
export const auth = betterAuth({
  database: mongodbAdapter(client.db("e-commerce"), { client }),
  emailAndPassword: { enabled: true },
  plugins: [nextCookies()]
});

export const db = client.db("e-commerce");
