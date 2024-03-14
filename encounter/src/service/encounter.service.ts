import { eq } from "drizzle-orm";
import { encounters, hiddenLocationEncounters, miscEncounters, socialEcnounters, touristProgress } from "../db/schema";
import db from "../utils/db-connection";
import { CreateEncounterDto, CreateHiddenEncounterDto,CreateMiscEncounterDto,CreateSocialEncounterDto } from "../schema/encounter.schema";
import { number } from "zod";




export default class EncounterService {
  public async getAll() {
    try {
      const result = await db.query.encounters.findMany();
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  


  public async createMiscEncounterAuthor(encounterData: CreateMiscEncounterDto) {
    try {
      const createEncounter = async (encounter: CreateEncounterDto) => {
       const result  = await db.insert(encounters).values(encounter).returning({ id: encounters.id });
        
        return db.insert(miscEncounters).values({ id: result[0].id , challengeDone: encounterData.challengeDone})
      };

      return await createEncounter(encounterData);
    } catch (error) {
      console.log(error);
    }
  }




  public async createMiscEncounterTourist(encounterData: CreateMiscEncounterDto) {
    try {
        const result1 = await db.select().from(touristProgress).where(eq(touristProgress.id, encounterData.id))
        if( result1[0].level >= 10 ){
      
            const createEncounter = async (encounter: CreateEncounterDto) => {
                const result  = await db.insert(encounters).values(encounter).returning({ id: encounters.id });
                 
                 return db.insert(miscEncounters).values({ id: result[0].id , challengeDone: encounterData.challengeDone})
                
                };
                return await createEncounter(encounterData);
            
        }

        else{
            console.log("dragan");
        }

      

      
    } catch (error) {
      console.log(error);
    }
  }





  public async createSocialEncounterTourist(encounterData: CreateSocialEncounterDto) {
    try {

        const result1 = await db.select().from(touristProgress).where(eq(touristProgress.id, encounterData.id))
        if( result1[0].level >= 10 ){
      
      const createEncounter = async (encounter: CreateEncounterDto) => {
       const result  = await db.insert(encounters).values(encounter).returning({ id: encounters.id });
        
        return db.insert(socialEcnounters).values({ id: result[0].id , peopleNumber: encounterData.peopleNumber})
      };

      return await createEncounter(encounterData);
    }
    else{
        console.log("dragisa");
    }
    } catch (error) {
      console.log(error);
    }
  }




  public async createSocialEncounterAuthor(encounterData: CreateSocialEncounterDto) {
    try {
      const createEncounter = async (encounter: CreateEncounterDto) => {
       const result  = await db.insert(encounters).values(encounter).returning({ id: encounters.id });
        
        return db.insert(socialEcnounters).values({ id: result[0].id , peopleNumber: encounterData.peopleNumber})
      };

      return await createEncounter(encounterData);
    } catch (error) {
      console.log(error);
    }
  }



  public async createHiddenEncounterTourist(encounterData: CreateHiddenEncounterDto) {
    try {
        const result1 = await db.select().from(touristProgress).where(eq(touristProgress.id, encounterData.id))
        if( result1[0].level >= 10 ){
      

      const createEncounter = async (encounter: CreateEncounterDto) => {
       const result  = await db.insert(encounters).values(encounter).returning({ id: encounters.id });
        
        return db.insert(hiddenLocationEncounters).values({ id: result[0].id , pictureLatitude: encounterData.PictureLatitude ,pictureLongitude:encounterData.PictureLongitude})
      };

      return await createEncounter(encounterData);
    }
    else{
        console.log("dragance");
    }
    } catch (error) {
      console.log(error);
    }
  }


  
  public async createHiddenEncounterAuthor(encounterData: CreateHiddenEncounterDto) {
    try {
      const createEncounter = async (encounter: CreateEncounterDto) => {
       const result  = await db.insert(encounters).values(encounter).returning({ id: encounters.id });
        
        return db.insert(hiddenLocationEncounters).values({ id: result[0].id , pictureLatitude: encounterData.PictureLatitude ,pictureLongitude:encounterData.PictureLongitude})
      };

      return await createEncounter(encounterData);
    } catch (error) {
      console.log(error);
    }
  }

  
  public async createEncounter(encounterData: CreateEncounterDto) {
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
