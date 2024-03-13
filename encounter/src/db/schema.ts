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

export const encounterSchema = pgSchema("encounters");

export const encounters = encounterSchema.table("Encounters", {
  id: serial("Id").primaryKey(),
  title: varchar("Title", { length: 256 }),
  description: varchar("Description", { length: 256 }),
  picture: varchar("Picture", { length: 256 }),
  longitude: doublePrecision("Longitude"),
  latitude: doublePrecision("Latitude"),
  radius: doublePrecision("Radius"),
  xpReward: integer("XpReward"),
  status: integer("Status"),
  type: integer("Type"),
  instances: jsonb("Instances"),
});

export const hiddenLocationEncounters = encounterSchema.table(
  "HiddenLocationEncounters",
  {
    id: bigint("Id", { mode: "number" })
      .primaryKey()
      .references(() => encounters.id),
    pictureLongitude: doublePrecision("PictureLongitude").notNull(),
    pictureLatitude: doublePrecision("PictureLatitude").notNull(),
  }
);

export const keyPointEncounter = encounterSchema.table("KeyPointEncounter", {
  id: bigint("Id", { mode: "number" })
    .primaryKey()
    .references(() => encounters.id),
  keyPointId: bigint("KeyPointId", { mode: "number" }).notNull(),
});

export const miscEncounters = encounterSchema.table("MiscEncounters", {
  id: bigint("Id", { mode: "number" })
    .primaryKey()
    .references(() => encounters.id),
  challengeDone: boolean("ChallengeDone").notNull(),
});

export const socialEcnounters = encounterSchema.table("SocialEncounters", {
  id: bigint("Id", { mode: "number" })
    .primaryKey()
    .references(() => encounters.id),
  peopleNumber: integer("PeopleNumber").notNull(),
});

export const touristProgress = encounterSchema.table("TouristProgress", {
  id: bigint("Id", { mode: "number" }).primaryKey(),
  userId: bigint("UserId", { mode: "number" }).notNull(),
  xp: integer("Xp").notNull(),
  level: integer("Level").notNull(),
});
