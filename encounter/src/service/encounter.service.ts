import db from "../utils/db-connection";

export default class EncounterService {
  public async getAll() {
    try {
      const result = await db.query.encounters.findMany();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
