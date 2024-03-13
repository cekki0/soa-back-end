import { eq } from "drizzle-orm";
import { encounters } from "../db/schema";
import db from "../utils/db-connection";
import { CreateEncounterDto } from "../schema/encounter.schema";

export default class EncounterService {
  public async getAll() {
    try {
      const result = await db.query.encounters.findMany();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async create(encounterData: CreateEncounterDto) {
    try {
      const createEncounter = async (encounter: CreateEncounterDto) => {
        return db.insert(encounters).values(encounter);
      };

      return await createEncounter(encounterData);
    } catch (error) {
      console.log(error);
    }
  }

  public async getById(encounterId: number) {
    try {
      const result = await db
        .select()
        .from(encounters)
        .where(eq(encounters.id, encounterId));
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async delete(encounterId: number) {
    try {
      const result = await db
        .delete(encounters)
        .where(eq(encounters.id, encounterId));
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
