import { Encounter, EncounterStatus, EncounterType } from "./Encounter";

export class HiddenLocationEncounter extends Encounter {
  PictureLongitude: number;
  PictureLatitude: number;

  constructor(
    pictureLongitude: number,
    pictureLatitude: number,
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
    this.PictureLongitude = pictureLongitude;
    this.PictureLatitude = pictureLatitude;
  }

  isUserInCompletionRange(
    userLongitude: number,
    userLatitude: number
  ): boolean {
    if (userLongitude < -180 || userLongitude > 180)
      throw new Error("Invalid Longitude");
    if (userLatitude < -90 || userLatitude > 90)
      throw new Error("Invalid Latitude");

    const earthRadius = 6371000;
    const latitude1 = (this.PictureLatitude * Math.PI) / 180;
    const longitude1 = (this.PictureLongitude * Math.PI) / 180;
    const latitude2 = (userLatitude * Math.PI) / 180;
    const longitude2 = (userLongitude * Math.PI) / 180;

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

    return distance < 10;
  }
}
