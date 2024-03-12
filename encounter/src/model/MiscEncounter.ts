import { Encounter, EncounterStatus, EncounterType } from "./Encounter";

export class MiscEncounter extends Encounter {
  ChallengeDone: boolean;

  constructor(
    challengeDone: boolean,
    title: string,
    description: string,
    picture: string,
    longitude: number,
    latitude: number,
    radius: number,
    xpReward: number,
    status: EncounterStatus,
    type: EncounterType
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
      type
    );
    this.ChallengeDone = challengeDone;
  }
}
