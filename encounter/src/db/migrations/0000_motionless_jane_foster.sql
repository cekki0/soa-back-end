CREATE SCHEMA "encounters";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."Encounters" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Title" text NOT NULL,
	"Description" text NOT NULL,
	"Picture" text NOT NULL,
	"Longitude" double precision NOT NULL,
	"Latitude" double precision NOT NULL,
	"Radius" double precision NOT NULL,
	"XpReward" integer NOT NULL,
	"Status" integer NOT NULL,
	"Type" integer NOT NULL,
	"Instances" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."HiddenLocationEncounters" (
	"Id" bigint PRIMARY KEY NOT NULL,
	"PictureLongitude" double precision NOT NULL,
	"PictureLatitude" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."KeyPointEncounter" (
	"Id" bigint PRIMARY KEY NOT NULL,
	"KeyPointId" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."MiscEncounters" (
	"Id" bigint PRIMARY KEY NOT NULL,
	"ChallengeDone" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."SocialEncounters" (
	"Id" bigint PRIMARY KEY NOT NULL,
	"PeopleNumber" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."TouristProgress" (
	"Id" serial PRIMARY KEY NOT NULL,
	"UserId" bigint NOT NULL,
	"Xp" integer NOT NULL,
	"Level" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "encounters"."HiddenLocationEncounters" ADD CONSTRAINT "HiddenLocationEncounters_Id_Encounters_Id_fk" FOREIGN KEY ("Id") REFERENCES "encounters"."Encounters"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "encounters"."KeyPointEncounter" ADD CONSTRAINT "KeyPointEncounter_Id_Encounters_Id_fk" FOREIGN KEY ("Id") REFERENCES "encounters"."Encounters"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "encounters"."MiscEncounters" ADD CONSTRAINT "MiscEncounters_Id_Encounters_Id_fk" FOREIGN KEY ("Id") REFERENCES "encounters"."Encounters"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "encounters"."SocialEncounters" ADD CONSTRAINT "SocialEncounters_Id_Encounters_Id_fk" FOREIGN KEY ("Id") REFERENCES "encounters"."Encounters"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
