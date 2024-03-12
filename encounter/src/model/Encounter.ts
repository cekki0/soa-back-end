import {
  EncounterInstance,
  EncounterInstanceStatus,
} from "./EncounterInstance";

export class Encounter {
  Title: string;
  Description: string;
  Picture: string;
  Longitude: number;
  Latitude: number;
  Radius: number;
  XpReward: number;
  Status: EncounterStatus;
  Type: EncounterType;
  Instances: EncounterInstance[] = [];

  constructor(
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
    this.Title = title;
    this.Description = description;
    this.Picture = picture;
    this.Longitude = longitude;
    this.Latitude = latitude;
    this.Radius = radius;
    this.XpReward = xpReward;
    this.Status = status;
    this.Type = type;
    this.Validate();
  }

  private Validate(): void {
    if (!this.Title.trim()) throw new Error("Invalid Title");
    if (!this.Description.trim()) throw new Error("Invalid Description");
    if (!this.Picture.trim()) throw new Error("Invalid Picture");
    if (this.Longitude < -180 || this.Longitude > 180)
      throw new Error("Invalid Longitude");
    if (this.Latitude < -90 || this.Latitude > 90)
      throw new Error("Invalid Latitude");
    if (this.XpReward < 0) throw new Error("XP cannot be negative");
  }

  Archive(): void {
    this.Status = EncounterStatus.Archived;
  }

  Publish(): void {
    this.Status = EncounterStatus.Active;
  }

  CancelEncounter(userId: number): void {
    if (this.hasUserActivatedEncounter(userId)) {
      const instance = this.Instances.find((x) => x.UserId === userId);
      if (instance!.Status === EncounterInstanceStatus.Completed)
        throw new Error("User has already completed this encounter.");
      this.Instances.splice(this.Instances.indexOf(instance!), 1);
    } else {
      throw new Error("User has not activated this encounter.");
    }
  }

  ActivateEncounter(
    userId: number,
    userLongitude: number,
    userLatitude: number
  ): void {
    if (this.Status !== EncounterStatus.Active)
      throw new Error("Encounter is not yet published.");
    if (this.hasUserActivatedEncounter(userId))
      throw new Error("User has already activated/completed this encounter.");
    if (!this.isUserInRange(userLongitude, userLatitude))
      throw new Error("User is not close enough to the encounter.");

    this.Instances.push(new EncounterInstance(userId));
  }

  CompleteEncounter(userId: number): void {
    try {
      this.CompleteEncounterInstance(userId);
    } catch (e) {
      throw e;
    }
  }

  protected CompleteEncounterInstance(userId: number): void {
    try {
      this.Instances.find((x) => x.UserId === userId)!.Complete();
    } catch (e) {
      throw new Error("Invalid user id.");
    }
  }

  protected hasUserActivatedEncounter(userId: number): boolean {
    return this.Instances.find((x) => x.UserId === userId) !== undefined;
  }

  protected isUserInRange(
    userLongitute: number,
    userLatitude: number
  ): boolean {
    if (userLongitute < -180 || userLongitute > 180)
      throw new Error("Invalid Longitude");
    if (userLatitude < -90 || userLatitude > 90)
      throw new Error("Invalid Latitude");

    const earthRadius = 6371000;
    const latitude1 = (this.Latitude * Math.PI) / 180;
    const longitude1 = (this.Longitude * Math.PI) / 180;
    const latitude2 = (userLatitude * Math.PI) / 180;
    const longitude2 = (userLongitute * Math.PI) / 180;

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

    return distance < this.Radius;
  }

  IsInRangeOf(
    range: number,
    userLongitute: number,
    userLatitude: number
  ): boolean {
    if (userLongitute < -180 || userLongitute > 180)
      throw new Error("Invalid Longitude");
    if (userLatitude < -90 || userLatitude > 90)
      throw new Error("Invalid Latitude");

    const earthRadius = 6371000;
    const latitude1 = (this.Latitude * Math.PI) / 180;
    const longitude1 = (this.Longitude * Math.PI) / 180;
    const latitude2 = (userLatitude * Math.PI) / 180;
    const longitude2 = (userLongitute * Math.PI) / 180;

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

    return distance < range;
  }
}

export enum EncounterStatus {
  Active,
  Draft,
  Archived,
}
export enum EncounterType {
  Social,
  Hidden,
  Misc,
  KeyPoint,
}
