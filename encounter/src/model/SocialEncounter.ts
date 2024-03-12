import { Encounter, EncounterStatus, EncounterType } from "./Encounter";
import { EncounterInstanceStatus } from "./EncounterInstance";

export class SocialEncounter extends Encounter {
  PeopleNumber: number;

  constructor(
    title: string,
    description: string,
    picture: string,
    longitude: number,
    latitude: number,
    radius: number,
    xpReward: number,
    status: EncounterStatus,
    peopleNumber: number,
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
    this.PeopleNumber = peopleNumber;
    this.ValidateSocialEncounter();
  }

  ValidateSocialEncounter(): void {
    if (this.PeopleNumber < 1) throw new Error("Invalid people number");
  }

  CompleteEncounter(userId: number): void {
    const encounterInstance = this.Instances.find((x) => x.UserId === userId);
    const activatedInstances = this.Instances.filter(
      (i) => i.Status === EncounterInstanceStatus.Active
    ).length;

    if (activatedInstances >= this.PeopleNumber) {
      encounterInstance!.Complete();
    } else {
      throw new Error("Not enough users that activated social encounter.");
    }
  }
}
