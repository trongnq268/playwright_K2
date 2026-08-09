import { Page } from "@playwright/test";

export const getBookingUI = (page: Page) => ({
  homeHeading: page.getByText("Check Availability & Book Your Stay"),
  selectDateUI: getDatePickerLocators(page),
  selectRoomCardUI: getRoomSelectLocators(page),
  viewRoomDetailUI: getViewRoomDetailLocators(page),
  successBookingUI: getBookingConfirmationLocators(page),
  bookingFormUI: getBookingFormLocators(page)
});

//datepicker ở home
export const getDatePickerLocators = (page: Page) => ({
  checkinInput: page.locator('div:has(> label[for="checkin"]) input'),
  checkoutInput: page.locator('div:has(> label[for="checkout"]) input'),
  checkAvailabilityBtn: page.getByRole("button", {
    name: "Check Availability",
  }),
});

export const getRoomSelectLocators = (page: Page) => {
  const roomCard = (roomType: string) =>
    page.getByRole("heading", { name: roomType, level: 5 });

  return {
    roomSelectHeading: page.getByRole("heading", { name: "Our Rooms" }),
    roomSelectSubHeading: page
      .locator(".lead.text-muted")
      .filter({ hasText: "Comfortable beds and delightful breakfast" }),
    roomCard: roomCard,
    bookNowBtn: (roomType: string) =>
      page
        .locator(".room-card")
        .filter({ has: roomCard(roomType) })
        .getByRole("link", { name: "Book now" }),
  };
};

export const getViewRoomDetailLocators = (page: Page) => ({
  homeBreadcrumb: page.locator(`span:has-text("Shady Meadows B&B")`),
  roomTypeHeading: (roomType: string) =>
    page.getByRole("heading", { name: roomType }),
  bookThisRoomHeading: page.getByRole("heading", { name: "Book This Room" }),
  bookingCalendar: page.locator(".rbc-toolbar"),
  firstReserveBtn: page.locator("#doReservation"),
});

export const getBookingFormLocators = (page: Page) => ({
  firstNameInput: page.getByRole("textbox", { name: "Firstname" }),
  lastNameInput: page.getByRole("textbox", { name: "Lastname" }),
  emailInput: page.getByRole("textbox", { name: "Email" }),
  phoneInput: page.getByRole("textbox", { name: "Phone" }),
  cancelBtn: page.getByRole("button", { name: "Cancel" }),
  finalReserveBtn: page.getByRole("button", { name: "Reserve Now" }),
  alertBox: page.locator(".alert.alert-danger"),
  allValidationMsg: page.locator(".alert.alert-danger li"),
});

export const getBookingConfirmationLocators = (page: Page) => ({
  confirmedHeading: page.getByRole("heading", { name: "Booking Confirmed" }),
  confirmedDatesText: page.locator(".card-body .text-center.pt-2"),
  returnLink: page.getByRole("link", { name: "Return home" }),
});
