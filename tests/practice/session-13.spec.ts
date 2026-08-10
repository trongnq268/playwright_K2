import { test } from "@playwright/test";

class GuestInfo {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
  ) {}

  getFullName(): string {
    return `full name: ${this.firstName} ${this.lastName}`;
  }
}

class BookingRequest {
  constructor(
    public roomPrice: number,
    public checkIn: Date,
    public checkOut: Date,
    public guest: GuestInfo,
  ) {}

  getNights(): number {
    const nightsInMil = this.checkOut.getTime() - this.checkIn.getTime();
    const nightsInDay = nightsInMil / (1000 * 60 * 60 * 24);
    return nightsInDay;
  }

  calculateTotalPrice(): number {
    return this.getNights() * this.roomPrice;
  }
}

test("Class test", () => {
  const guestA = new GuestInfo(
    "John",
    "Doe",
    "john.doe@gmail.com",
    "0123456789",
  );
  const startDate = new Date("2026-08-08");
  const endDate = new Date("2026-08-12");
  const booking = new BookingRequest(2100, startDate, endDate, guestA);
  const totalPrice = booking.calculateTotalPrice();

  console.log(`Total price: ${totalPrice}`);
  console.log(guestA.getFullName());

});
