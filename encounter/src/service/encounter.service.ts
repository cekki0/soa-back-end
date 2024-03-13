import { eq } from "drizzle-orm";
import { encounters } from "../db/schema";
import db from "../utils/db-connection";




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

    public async create(encounterData: EncountersData) {
        try {
            const createEncounter = async (encounter: EncountersData) => {
                return db.insert(encounters).values(encounter);
            };

            return await createEncounter(encounterData);
        } catch (error) {
            console.log(error);
        }
    }


    

    public async getById(encounterId: number) {
        try {
            const result = await db.select().from(encounters).where(eq(encounters.Id, encounterId));
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    public async delete(encounterId: number) {
        try {
            const result =  await db.delete(encounters).where(eq(encounters.Id, encounterId));
            return result;
        } catch (error) {
            console.log(error);
            
        }
    }


}
