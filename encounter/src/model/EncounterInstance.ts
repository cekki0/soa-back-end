export class EncounterInstance {
  userId: number;
  encounterInstanceStatus: Status;
  completionTime: Date;
}

export enum Status {
  Active,
  Completed,
}
