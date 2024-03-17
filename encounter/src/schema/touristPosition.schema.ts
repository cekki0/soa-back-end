import { date, number, object, z } from "zod";

export const TouristPositionSchema = object({
  touristId: number({
    required_error: "TouristId is required",
  }),
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
});

export const PositionWithRangeSchema = object({
  range: number({
    required_error: "Range is required",
  }),
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
});

export type TouristPoisitionDto = z.infer<typeof TouristPositionSchema>;
export type PositionWithRangeDto = z.infer<typeof PositionWithRangeSchema>;
