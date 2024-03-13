import { object, string, TypeOf, number, z } from "zod";

export const EncounterSchema = object({
  title: string({
    required_error: "title is required",
  }).min(3, "Title is too short."),
  description: string({
    required_error: "description is required",
  }),
  picture: string({
    required_error: "picture is required",
  }).url("Invalid picture url."),
  longitude: number({
    required_error: "Longitude is required",
  })
    .lt(180, "Invalid longitude value")
    .gt(-180, "Invalid longitude value"),
  latitude: number({
    required_error: "Latitude is required",
  })
    .lt(90, "Invalid latitude value")
    .gt(-90, "Invalid latitude value"),
  radius: number({
    required_error: "radius is required",
  }).gt(0, "Invalid radius value"),
  xpReward: number({
    required_error: "Xp reward is required",
  }).gt(0, "Invalid xp reward value"),
  encounterStatus: number({
    required_error: "Encounter status is required",
  })
    .gte(0, "Invalid encounter status value")
    .lte(2, "Invalid encounter status value"),
  encounterType: number({
    required_error: "Encounter type is required",
  })
    .gte(0, "Invalid encounter type value")
    .lte(4, "Invalid encounter type value"),
});

export type CreateEncounterDto = z.infer<typeof EncounterSchema>;
