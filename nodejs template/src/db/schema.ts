import { pgSchema, serial, varchar } from "drizzle-orm/pg-core";

export const schema = pgSchema("example");

export const example = schema.table("TableName", {
  id: serial("Id").primaryKey(),
  name: varchar("Name", { length: 256 }),
});
