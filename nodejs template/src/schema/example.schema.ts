import { object, string, TypeOf, number } from "zod";

export const exampleSchema = object({
  body: object({
    prop1: string({ required_error: "prop is required" }),
    prop2: number({ required_error: "prop is required" }).gt(10),
  }),
});

export type exampleType = TypeOf<typeof exampleSchema>;
