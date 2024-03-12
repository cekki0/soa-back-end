import db from "../utils/db-connection";

export default class ExampleService {
  public async getAll() {
    try {
      const result = await db.query.example.findMany();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
