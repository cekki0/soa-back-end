import { Encounter, EncounterStatus, EncounterType } from "./Encounter";

export class KeyPointEncounter extends Encounter {
  KeyPointId: number;

  constructor(
    title: string,
    description: string,
    picture: string,
    longitude: number,
    latitude: number,
    radius: number,
    xpReward: number,
    status: EncounterStatus,
    keyPointId: number
  ) {
    super(
      title,
      description,
      picture,
      longitude,
      latitude,
      radius,
      xpReward,
      status,
      EncounterType.KeyPoint
    );
    this.KeyPointId = keyPointId;
  }

  CompleteEncounter(userId: number): void {
    super.CompleteEncounter(userId);
  }
}
