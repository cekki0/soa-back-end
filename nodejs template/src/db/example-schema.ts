import {
  bigint,
  boolean,
  doublePrecision,
  integer,
  jsonb,
  pgSchema,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const schema = pgSchema("encounters");

export const encounters = schema.table("Encounters", {
  Id: serial("Id").primaryKey(),
  Title: varchar("Title", { length: 256 }),
  Description: varchar("Description", { length: 256 }),
  Picture: varchar("Picture", { length: 256 }),
  Longitude: doublePrecision("Longitude"),
  Latitude: doublePrecision("Latitude"),
  Radius: doublePrecision("Radius"),
  XpReward: integer("XpReward"),
  Status: integer("Status"),
  Type: integer("Type"),
  Instances: jsonb("Instances"),
});

export const hiddenLocationEncounters = schema.table(
  "HiddenLocationEncounters",
  {
    Id: bigint("Id", { mode: "number" })
      .primaryKey()
      .references(() => encounters.Id),
    PictureLongitude: doublePrecision("PictureLongitude").notNull(),
    PictureLatitude: doublePrecision("PictureLatitude").notNull(),
  }
);

export const keyPointEncounter = schema.table("KeyPointEncounter", {
  Id: bigint("Id", { mode: "number" })
    .primaryKey()
    .references(() => encounters.Id),
  KeyPointId: bigint("KeyPointId", { mode: "number" }).notNull(),
});

export const miscEncounters = schema.table("MiscEncounters", {
  Id: bigint("Id", { mode: "number" })
    .primaryKey()
    .references(() => encounters.Id),
  ChallengeDone: boolean("ChallengeDone").notNull(),
});

export const socialEcnounters = schema.table("SocialEncounters", {
  Id: bigint("Id", { mode: "number" })
    .primaryKey()
    .references(() => encounters.Id),
  PeopleNumber: integer("PeopleNumber").notNull(),
});

export const touristProgress = schema.table("TouristProgress", {
  Id: bigint("Id", { mode: "number" }).primaryKey(),
  UserId: bigint("UserId", { mode: "number" }).notNull(),
  Xp: integer("Xp").notNull(),
  Level: integer("Level").notNull(),
});
