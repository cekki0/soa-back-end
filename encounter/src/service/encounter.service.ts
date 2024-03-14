import { eq } from "drizzle-orm";
import { encounters } from "../db/schema";
import db from "../utils/db-connection";
import { CreateEncounterDto } from "../schema/encounter.schema";
import Result from "../utils/Result";
import {
  EncounterInstanceDto,
  EncounterInstanceSchema,
} from "../schema/encounterInstance.schema";




type EncountersData = {
    Id: number;
    Title: string;
    Description: string;
    Picture: string;
    Longitude: number;
    Latitude: number;
    Radius: number;
    XpReward: number;
    Status: number;
    Type: number;
    Instances: string;
    
};
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

  public async getInstances(
    encounterId: number,
    userId: number
  ): Promise<Result<EncounterInstanceDto[]>> {
    const result = new Result<EncounterInstanceDto[]>();
    try {
      const instancesResult = await db
        .select({ instances: encounters.instances })
        .from(encounters)
        .where(eq(encounters.id, encounterId));

      if (!instancesResult) {
        result.message = "Invalid encounter id";
        return result;
      }
      result.success = true;
      if (instancesResult[0] && instancesResult[0].instances) {
        const instances = await Promise.all(
          instancesResult[0].instances.map((x) => {
            return EncounterInstanceSchema.parseAsync(x);
          })
        );
        result.value = instances.filter((x) => x.userId == userId);
      }
      return result;
    } catch (error: any) {
      console.error(error);
      result.success = false;
      result.message = error.message;
      return result;
    }
  }
}
