import { object, string, TypeOf, number, z } from "zod";
import {
  EncounterInstanceDto,
  EncounterInstanceSchema,
} from "./encounterInstance.schema";

export const EncounterSchema = object({
  title: string({
    required_error: "Title is required",
  }).min(3, "Title is too short."),
  description: string({
    required_error: "Description is required",
  }),
  picture: string({
    required_error: "Picture is required",
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
  instances: EncounterInstanceSchema.array().optional().nullable(),
});

const hasId = z.object({ id: number() });

export const ResponseEncounterSchema = EncounterSchema.omit({
  encounterStatus: true,
  instances: true,
});

export const EncounterWithIdSchema = EncounterSchema.merge(hasId);

export type EncounterDto = z.infer<typeof EncounterWithIdSchema>;
export type CreateEncounterDto = z.infer<typeof EncounterSchema>;
export type ResponseEncounterDto = z.infer<typeof ResponseEncounterSchema>;
