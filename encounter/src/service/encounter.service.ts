import { eq } from "drizzle-orm";
import { encounters, touristProgress } from "../db/schema";
import db from "../utils/db-connection";
import {
  CreateEncounterDto,
  ResponseEncounterDto,
  ResponseEncounterSchema,
} from "../schema/encounter.schema";
import Result from "../utils/Result";
import {
  EncounterInstanceDto,
  EncounterInstanceSchema,
} from "../schema/encounterInstance.schema";
import { error } from "console";

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

  public async getInstance(
    encounterId: number,
    userId: number
  ): Promise<Result<EncounterInstanceDto>> {
    const result = new Result<EncounterInstanceDto>();
    try {
      const instancesResult = await db
        .select({ instances: encounters.instances })
        .from(encounters)
        .where(eq(encounters.id, encounterId));

      if (!instancesResult[0]) {
        result.message = "Invalid encounter id";
        return result;
      }
      result.success = true;
      if (instancesResult[0] && instancesResult[0].instances) {
        const instance = instancesResult[0].instances.find(
          (x) => x.userId == userId
        );

        if (instance) {
          result.value = instance;
        }
      }
      return result;
    } catch (error: any) {
      console.error(error);
      result.success = false;
      result.message = error.message;
      return result;
    }
  }

  public async activateEncounter(
    userId: number,
    encounterId: number,
    longitude: number,
    latitude: number
  ): Promise<Result<ResponseEncounterDto>> {
    const result = new Result<ResponseEncounterDto>();
    try {
      // Create progress row if doesn't exist
      const queryResult = await db
        .select()
        .from(touristProgress)
        .where(eq(touristProgress.userId, userId));
      if (!queryResult) {
        await db
          .insert(touristProgress)
          .values({ userId: userId, xp: 0, level: 1 });
      }

      // Activate encounter if possible
      const encounterResult = await db
        .select()
        .from(encounters)
        .where(eq(encounters.id, encounterId));
      if (!encounterResult) throw error("Encounter doesn't exist.");

      const encounter = encounterResult[0];

      if (encounter.encounterStatus != 0)
        throw error("Encounter is not yet published.");
      if (hasUserActivatedEncounter(encounter, userId))
        throw error("User has already activated/completed this encounter.");
      if (!isUserInRange(encounter, longitude, latitude))
        throw error("User is not close enough to the encounter.");

      const encounterInstance: EncounterInstanceDto = {
        userId: userId,
        status: 0,
      };

      encounter.instances?.push(encounterInstance);

      const updateResult = await db
        .update(encounters)
        .set(encounter)
        .where(eq(encounters.id, encounterId));
      if (!updateResult) throw error("Failed to update encounter instances.");
      result.value = ResponseEncounterSchema.parse(encounter);
      result.success = true;
    } catch (error: any) {
      console.error(error);
      result.message = error.message;
    }
    return result;
  }
}
function hasUserActivatedEncounter(
  encounter: {
    id: number;
    title: string;
    description: string;
    picture: string;
    longitude: number;
    latitude: number;
    radius: number;
    xpReward: number;
    encounterStatus: number;
    encounterType: number;
    instances:
      | { userId: number; status: number; completionTime?: Date | undefined }[]
      | null;
  },
  userId: number
): boolean {
  return encounter.instances?.findIndex((x) => x.userId == userId) != -1;
}

function isUserInRange(
  encounter: {
    id: number;
    title: string;
    description: string;
    picture: string;
    longitude: number;
    latitude: number;
    radius: number;
    xpReward: number;
    encounterStatus: number;
    encounterType: number;
    instances:
      | { userId: number; status: number; completionTime?: Date | undefined }[]
      | null;
  },
  longitude: number,
  latitude: number
) {
  const earthRadius = 6371000;
  const latitude1 = (encounter.latitude * Math.PI) / 180;
  const longitude1 = (encounter.longitude * Math.PI) / 180;
  const latitude2 = (latitude * Math.PI) / 180;
  const longitude2 = (longitude * Math.PI) / 180;

  const latitudeDistance = latitude2 - latitude1;
  const longitudeDistance = longitude2 - longitude1;

  const a =
    Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(longitudeDistance / 2) *
      Math.sin(longitudeDistance / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance < encounter.radius;
}
