export class EncounterInstance {
  UserId: number;
  Status: EncounterInstanceStatus;
  CompletionTime?: Date | null;

  constructor(userId: number) {
    this.UserId = userId;
    this.Status = EncounterInstanceStatus.Active;
  }

  Complete(): void {
    this.Status = EncounterInstanceStatus.Completed;
    this.CompletionTime = new Date();
  }
}

export enum EncounterInstanceStatus {
  Active,
  Completed,
}
