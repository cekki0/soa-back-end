export class TouristProgress {
  UserId: number;
  Xp: number;
  Level: number;

  constructor(userId: number, xp: number, level: number) {
    this.UserId = userId;
    this.Xp = xp;
    this.Level = level;
  }

  AddXp(xp: number): void {
    while (xp > 0) {
      const xpNeeded = 100 - this.Xp;

      if (xp > xpNeeded) {
        this.Xp = 0;
        xp -= xpNeeded;
        this.Level++;
      } else {
        this.Xp += xp;
        xp = 0;
      }
    }
  }
}
