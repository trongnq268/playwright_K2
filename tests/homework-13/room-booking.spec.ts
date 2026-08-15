import { test, expect } from "@playwright/test";
import { ContactSection } from "../../pages/contact.section";
import { RoomBookingSection } from "../../pages/room-booking.section";
import { GuestInfo } from "../../models/GuestInfo.class";
import { BOOKING_OPTION, NEW_GUEST } from "../../data/contactFormData";

test.describe("E2E room booking flow", () => {
  let contact: ContactSection;
  let booking: RoomBookingSection;

  test.beforeEach("Open web", async ({ page }) => {
    contact = new ContactSection(page);
    booking = new RoomBookingSection(page);

    await test.step("Navigate to booking web", async () => {
      await contact.goto();
    });
  });

  test("E2E booking flow test", async () => {
    await test.step("init guestInfo and IbookingOptions", async () => {
      const newGuest = new GuestInfo(
        NEW_GUEST.firstName,
        NEW_GUEST.lastName,
        NEW_GUEST.email,
        NEW_GUEST.phone,
      );

      await test.step("Select dates, open booking modal", async () => {
        await booking.selectDates(BOOKING_OPTION);
        await booking.toOpenBookingModal(BOOKING_OPTION.roomType);
      });

      await test.step("Enter guest infor and book room", async () => {
        await booking.fillBookingDetails(newGuest);
        await booking.confirmBooking();
      });

      await test.step("Verify booking successful and matching input data", async () => {
        const bookingResult = await booking.getBookingConfirmation();
        expect(bookingResult).toBeTruthy();
        
        const actualDates = await booking.confirmedDates.innerText();
        expect(actualDates).toContain(BOOKING_OPTION.startDate);
        expect(actualDates).toContain(BOOKING_OPTION.endDate);
      });
    });
  });
});
