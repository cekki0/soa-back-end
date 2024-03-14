import {
  bigint,
  boolean,
  doublePrecision,
  integer,
  jsonb,
  pgSchema,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { EncounterInstanceDto } from "../schema/encounterInstance.schema";

export const encounterSchema = pgSchema("encounters");

export const encounters = encounterSchema.table("Encounters", {
  id: serial("Id").primaryKey(),
  title: text("Title").notNull(),
  description: text("Description").notNull(),
  picture: text("Picture").notNull(),
  longitude: doublePrecision("Longitude").notNull(),
  latitude: doublePrecision("Latitude").notNull(),
  radius: doublePrecision("Radius").notNull(),
  xpReward: integer("XpReward").notNull(),
  encounterStatus: integer("Status").notNull(),
  encounterType: integer("Type").notNull(),
  instances: jsonb("Instances").$type<EncounterInstanceDto[]>(),
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
