import { date, number, object, z } from "zod";

export const EncounterInstanceSchema = object({
  userId: number({
    required_error: "UserId is required",
  }),
  status: number({
    required_error: "Status is required",
  })
    .gte(0)
    .lte(1),
  completionTime: z.coerce.date().optional(),
});

export type EncounterInstanceDto = z.infer<typeof EncounterInstanceSchema>;
