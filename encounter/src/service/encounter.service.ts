import { eq } from "drizzle-orm";
import Result from "../utils/Result";
import {
  EncounterInstanceDto,
  EncounterInstanceSchema,
} from "../schema/encounterInstance.schema";
import {
  PositionWithRangeDto,
  TouristPoisitionDto,
} from "../schema/touristPosition.schema";
import {
  encounters,
  hiddenLocationEncounters,
  miscEncounters,
  socialEcnounters,
  touristProgress,
  TouristProgress,
} from "../db/schema";
import db from "../utils/db-connection";
import {
  CreateEncounterDto,
  CreateHiddenEncounterDto,
  CreateMiscEncounterDto,
  CreateSocialEncounterDto,
  EncounterDto,
  EncounterSchema,
  EncounterSchemaID,
  ResponseEncounterDto,
  ResponseEncounterSchema,
} from "../schema/encounter.schema";
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

  public async createMiscEncounterAuthor(
    encounterData: CreateMiscEncounterDto
  ) {
    try {
      const createEncounter = async (encounter: CreateEncounterDto) => {
        const result = await db
          .insert(encounters)
          .values(encounter)
          .returning({ id: encounters.id });

        return db.insert(miscEncounters).values({
          id: result[0].id,
          challengeDone: encounterData.challengeDone,
        });
      };

      return await createEncounter(encounterData);
    } catch (error) {
      console.log(error);
    }
  }

  public async createMiscEncounterTourist(
    encounterData: CreateMiscEncounterDto,
    userId: number
  ) {
    try {
      const result1 = await db
        .select()
        .from(touristProgress)
        .where(eq(touristProgress.userId, userId));
      if (result1[0].level >= 10) {
        const createEncounter = async (encounter: CreateEncounterDto) => {
          const result = await db
            .insert(encounters)
            .values(encounter)
            .returning({ id: encounters.id });

          return db.insert(miscEncounters).values({
            id: result[0].id,
            challengeDone: encounterData.challengeDone,
          });
        };
        return await createEncounter(encounterData);
      } else {
        console.log("dragan");
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async createSocialEncounterTourist(
    encounterData: CreateSocialEncounterDto,
    userId: number
  ) {
    console.log(encounterData.peopleNumber);
    try {
      const result1 = await db
        .select()
        .from(touristProgress)
        .where(eq(touristProgress.userId, userId));
      if (result1[0].level >= 10) {
        const createEncounter = async (encounter: CreateEncounterDto) => {
          const result = await db
            .insert(encounters)
            .values(encounter)
            .returning({ id: encounters.id });

          return db.insert(socialEcnounters).values({
            id: result[0].id,
            peopleNumber: encounterData.peopleNumber,
          });
        };

        return await createEncounter(encounterData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async createSocialEncounterAuthor(
    encounterData: CreateSocialEncounterDto
  ) {
    try {
      const createEncounter = async (encounter: CreateEncounterDto) => {
        const result = await db
          .insert(encounters)
          .values(encounter)
          .returning({ id: encounters.id });

        return db.insert(socialEcnounters).values({
          id: result[0].id,
          peopleNumber: encounterData.peopleNumber,
        });
      };

      return await createEncounter(encounterData);
    } catch (error) {
      console.log(error);
    }
  }

  public async createHiddenEncounterTourist(
    encounterData: CreateHiddenEncounterDto,
    userId: number
  ) {
    try {
      const result1 = await db
        .select()
        .from(touristProgress)
        .where(eq(touristProgress.userId, userId));
      if (result1[0].level >= 10) {
        const createEncounter = async (encounter: CreateEncounterDto) => {
          const result = await db
            .insert(encounters)
            .values(encounter)
            .returning({ id: encounters.id });

          return db.insert(hiddenLocationEncounters).values({
            id: result[0].id,
            pictureLatitude: encounterData.pictureLatitude,
            pictureLongitude: encounterData.pictureLongitude,
          });
        };

        return await createEncounter(encounterData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async createHiddenEncounterAuthor(
    encounterData: CreateHiddenEncounterDto
  ) {
    try {
      const createEncounter = async (encounter: CreateEncounterDto) => {
        const result = await db
          .insert(encounters)
          .values(encounter)
          .returning({ id: encounters.id });

        return db.insert(hiddenLocationEncounters).values({
          id: result[0].id,
          pictureLatitude: encounterData.pictureLatitude,
          pictureLongitude: encounterData.pictureLongitude,
        });
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
      if (!queryResult[0]) {
        await db
          .insert(touristProgress)
          .values({ userId: userId, xp: 0, level: 1 });
      }

      // Activate encounter if possible
      const encounter = await this.getById(encounterId);

      if (encounter.status != 0)
        throw new Error("Encounter is not yet published.");
      if (this.hasUserActivatedEncounter(encounter, userId))
        throw new Error("User has already activated/completed this encounter.");
      if (!this.isUserInRange(encounter, longitude, latitude))
        throw new Error("User is not close enough to the encounter.");

      const encounterInstance: EncounterInstanceDto = {
        userId: userId,
        status: 0,
      };

      if (encounter.instances == null) {
        encounter.instances = [];
      }

      encounter.instances?.push(encounterInstance);

      const updateResult = await db
        .update(encounters)
        .set(encounter)
        .where(eq(encounters.id, encounterId));
      if (!updateResult)
        throw new Error("Failed to update encounter instances.");
      result.value = ResponseEncounterSchema.parse(encounter);
      result.success = true;
    } catch (error: any) {
      console.error(error);
      result.message = error.message;
    }
    return result;
  }

  public async completeHiddenEncounter(
    userId: number,
    encounterId: number,
    longitude: number,
    latitude: number
  ) {
    try {
      const encounter = await this.getById(encounterId);
      if (
        await this.checkIfUserInCompletionRange(encounterId, {
          longitude,
          latitude,
          touristId: userId,
        })
      ) {
        return this.completeEncounter(userId, encounter.id);
      }
      return { success: false, message: "User is not in range" };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error while completing encounter in service",
      };
    }
  }

  public async completeEncounter(
    userId: number,
    encounterId: number
  ): Promise<Result<TouristProgress>> {
    const result = new Result<TouristProgress>();
    try {
      const encounter = await this.getById(encounterId);

      if (encounter.type == 0) {
        const activeInstances = encounter.instances?.filter(
          (x) => (x.status = 0)
        );
        if (!activeInstances || activeInstances.length <= 5) {
          throw new Error(
            "Not enough tourists active on this social encounter."
          );
        }
      }

      // Complete instance
      const instanceIndex = encounter.instances?.findIndex(
        (x) => x.userId == userId
      );
      if (instanceIndex == -1 || instanceIndex === undefined)
        throw new Error("User hasn't started this encounter.");
      const instance = encounter.instances![instanceIndex];
      instance.status = 1;
      instance.completionTime = new Date();

      encounter.instances![instanceIndex] = instance;

      // Give xp to user
      const progress = (
        await db
          .select()
          .from(touristProgress)
          .where(eq(touristProgress.userId, userId))
      )[0];
      this.addXp(progress, encounter.xpReward);

      await db
        .update(encounters)
        .set(encounter)
        .where(eq(encounters.id, encounterId));
      await db
        .update(touristProgress)
        .set(progress)
        .where(eq(touristProgress.userId, userId));

      result.value = progress;
      result.success = true;
    } catch (error: any) {
      console.error(error);
      result.message = error.message;
    }

    return result;
  }

  public async cancelEncounter(
    userId: number,
    encounterId: number
  ): Promise<Result<ResponseEncounterDto>> {
    const result = new Result<ResponseEncounterDto>();
    try {
      const encounter = await this.getById(encounterId);

      if (!this.hasUserActivatedEncounter(encounter, userId))
        throw new Error("User has not activated this encounter.");

      const instanceIndex = encounter.instances?.findIndex(
        (x) => x.userId == userId
      )!;

      if (encounter.instances![instanceIndex].status == 1)
        throw new Error("User has already completed this encounter.");

      encounter.instances!.splice(instanceIndex, 1);

      await db
        .update(encounters)
        .set(encounter)
        .where(eq(encounters.id, encounterId));

      result.value = await ResponseEncounterSchema.parse(encounter);
      result.success = true;
    } catch (error: any) {
      console.error(error);
      result.message = error.message;
    }
    return result;
  }

  public async getById(encounterId: number): Promise<EncounterDto> {
    const encounterResult = await db
      .select()
      .from(encounters)
      .where(eq(encounters.id, encounterId));
    if (!encounterResult || encounterResult.length == 0)
      throw new Error("Encounter doesn't exist.");
    return await EncounterSchemaID.parse(encounterResult[0]);
  }

  public async getAllInRange(
    position: PositionWithRangeDto
  ): Promise<Result<EncounterDto[]>> {
    const result = new Result<EncounterDto[]>();
    try {
      const encounters = await this.getAll();
      const filteredEncounters = encounters?.filter((x) =>
        this.isEncounterInRangeOf(
          x,
          position.range,
          position.longitude,
          position.latitude
        )
      );

      result.value = filteredEncounters!;
      result.success = true;
    } catch (error: any) {
      console.error(error);
      result.message = error.message;
    }
    return result;
  }

  public async getProgress(userId: number): Promise<TouristProgress> {
    const progress = (
      await db
        .select()
        .from(touristProgress)
        .where(eq(touristProgress.userId, userId))
    )[0];
    return progress;
  }

  private isEncounterInRangeOf(
    encounter: EncounterDto,
    range: number,
    longitude: number,
    latitude: number
  ): boolean {
    const earthRadius: number = 6371000;
    const latitude1: number = (encounter.latitude * Math.PI) / 180;
    const longitude1: number = (encounter.longitude * Math.PI) / 180;
    const latitude2: number = (latitude * Math.PI) / 180;
    const longitude2: number = (longitude * Math.PI) / 180;

    const latitudeDistance: number = latitude2 - latitude1;
    const longitudeDistance: number = longitude2 - longitude1;

    const a: number =
      Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
      Math.cos(latitude1) *
        Math.cos(latitude2) *
        Math.sin(longitudeDistance / 2) *
        Math.sin(longitudeDistance / 2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance: number = earthRadius * c;

    return distance < range;
  }

  public async checkIfUserInCompletionRange(
    encounterId: number,
    userPos: TouristPoisitionDto
  ): Promise<Result> {
    const result = new Result();
    try {
      const hiddenData = (
        await db
          .select()
          .from(hiddenLocationEncounters)
          .where(eq(hiddenLocationEncounters.id, encounterId))
      )[0];
      if (
        !this.isUserInCompletionRange(
          hiddenData.pictureLongitude,
          hiddenData.pictureLatitude,
          userPos.longitude,
          userPos.latitude
        )
      )
        throw new Error("User not in encounter range.");
      result.success = true;
    } catch (error: any) {
      console.error(error);
      result.message = error.message;
    }
    return result;
  }

  private isUserInCompletionRange(
    targetLongitude: number,
    targetLatitude: number,
    userLongitude: number,
    userLatitude: number
  ): boolean {
    const earthRadius: number = 6371000;
    const latitude1: number = (targetLatitude * Math.PI) / 180; // encounter.pictureLatitude
    const longitude1: number = (targetLongitude * Math.PI) / 180; //encounter.pictureLongitude
    const latitude2: number = (userLatitude * Math.PI) / 180;
    const longitude2: number = (userLongitude * Math.PI) / 180;

    const latitudeDistance: number = latitude2 - latitude1;
    const longitudeDistance: number = longitude2 - longitude1;

    const a: number =
      Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
      Math.cos(latitude1) *
        Math.cos(latitude2) *
        Math.sin(longitudeDistance / 2) *
        Math.sin(longitudeDistance / 2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance: number = earthRadius * c;

    return distance < 20;
  }

  private addXp(progress: TouristProgress, xpReward: number) {
    while (xpReward > 0) {
      const xpNeeded = 100 - progress.xp;
      if (xpReward > xpNeeded) {
        progress.xp = 0;
        xpReward -= xpNeeded;
        progress.level++;
      } else {
        progress.xp += xpReward;
        xpReward = 0;
      }
    }
  }

  private hasUserActivatedEncounter(
    encounter: EncounterDto,
    userId: number
  ): boolean {
    const index = encounter.instances?.findIndex((x) => x.userId == userId);
    return index != -1 && index != undefined;
  }

  private isUserInRange(
    encounter: EncounterDto,
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
}
