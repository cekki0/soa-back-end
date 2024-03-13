import { object, string, TypeOf, number, z } from "zod";

export const ExampleSchema = object({
  body: object({
    prop1: string({ required_error: "prop is required" }),
    prop2: number({ required_error: "prop is required" }).gt(10),
  }),
});

export type ExampleDto = z.infer<typeof ExampleSchema>;
