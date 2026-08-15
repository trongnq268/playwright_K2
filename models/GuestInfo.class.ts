import { IGuestInfo } from "../types/room.booking.interface";

export class GuestInfo implements IGuestInfo {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string
  ) {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }


}
