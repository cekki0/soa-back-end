import "dotenv/config";
import pkg from "pg";
const { Client } = pkg;
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../db/schema";

const client = new Client({
  host: "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "super",
  database: process.env.DB_DATABASE || "explorer-v1",
});

await client.connect().then(() => {
  console.log(
    `Connected to {${process.env.DB_DATABASE || "explorer"}} database.`
  );
});

const db = drizzle(client, { schema });

export default db;
