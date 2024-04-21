import { example } from "../db/schema";
import { ExampleDto, ExampleSchema } from "../schema/example.schema";
import Result from "../utils/Result";
import db from "../utils/db-connection";
import logger from "../utils/logger";

export default class ExampleService {
  public async getFirst(): Promise<Result<ExampleDto>> {
    const result = new Result<ExampleDto>();
    try {
      const queryResult = await db.select().from(example);

      if (!queryResult[0]) throw new Error("Some error.");

      result.value = ExampleSchema.parse(queryResult[0]);
      result.success = true;
    } catch (error: any) {
      logger.error(error);
      result.message = error.message;
    }
    return result;
  }
}
