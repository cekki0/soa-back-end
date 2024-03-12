export default class Result<T = {}> {
  success: boolean;
  message: string;
  value: T;
  constructor() {
    this.success = false;
    this.message = "";
  }
}
