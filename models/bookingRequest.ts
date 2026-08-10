import { GuestInfo } from "./GuestInfo";

const MS_PER_NIGHT = 1000 * 60 * 60 * 24;

export class BookingRequest {
  constructor(
    public roomPrice: number,
    public checkIn: Date,
    public checkOut: Date,
    public guest: GuestInfo,
  ) {}

  getNights(): number {
    return (this.checkOut.getTime() - this.checkIn.getTime()) / MS_PER_NIGHT;
  }

  calculateTotalPrice(): number {
    return this.getNights() * this.roomPrice;
  }
}
