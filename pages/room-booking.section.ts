import { expect, Locator, Page } from "@playwright/test";
import { IBookingOptions } from "../types/room.booking.interface";
import { GuestInfo } from "../models/GuestInfo.class";

export class RoomBookingSection {
  constructor(private page: Page) {}

  get startDateInput(): Locator {
    return this.page.locator('div:has(> label[for="checkin"]) input');
  }
  get endDateInput(): Locator {
    return this.page.locator('div:has(> label[for="checkout"]) input');
  }

  get checkAvailabilityBtn(): Locator {
    return this.page.getByRole("button", {
      name: "Check Availability",
    });
  }

  getRoomBookButton(roomType: string): Locator {
    return this.page
      .locator(".room-card")
      .filter({ hasText: roomType.toUpperCase() })
      .getByRole("link", { name: "Book now" });
  }

  get bookingFormFisrtNameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Firstname" });
  }

  get bookingFormLastNameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Lastname" });
  }

  get bookingFormEmailInput(): Locator {
    return this.page.getByRole("textbox", { name: "Email" });
  }

  get bookingFormPhoneInput(): Locator {
    return this.page.getByRole("textbox", { name: "Phone" });
  }

  get bookingFormReserveBtn(): Locator {
    return this.page.getByRole("button", { name: "Reserve Now" });
  }

  get confirmedBookingHeader(): Locator {
    return this.page.getByRole("heading", { name: "Booking Confirmed" });
  }

  get confirmedDates(): Locator{
    return this.page.locator(".card-body .text-center.pt-2")
  }

  async toOpenBookingModal(roomType: string) {
    await this.getRoomBookButton(roomType).click();
    const reverseBtn = this.page.locator("#doReservation");
    await reverseBtn.click();
  }

  async selectDates(options: IBookingOptions) {
    await this.startDateInput.fill(options.startDate);
    await this.endDateInput.fill(options.endDate);
    await this.checkAvailabilityBtn.click();
    return options;
  }

  async fillBookingDetails(guest: GuestInfo) {
    await this.bookingFormFisrtNameInput.fill(guest.firstName);
    await this.bookingFormLastNameInput.fill(guest.lastName);
    await this.bookingFormEmailInput.fill(guest.email);
    await this.bookingFormPhoneInput.fill(guest.phone);
  }

  async confirmBooking() {
    await this.bookingFormReserveBtn.click();
  }

  async getBookingConfirmation(): Promise<boolean> {
    try{
      await expect(this.confirmedBookingHeader).toBeVisible(); 
      return true
    }
    catch (error){
      throw new Error('Booking failed since web could not load. Try with other booking dates')
    }
  }
}
