import { ContactFormModel } from "../models/ContactFormModel.class";
import { IBookingOptions, IGuestInfo } from "../types/room.booking.interface";
import { generateBookingDates } from "./bookingData";

export const VALID_CONTACT_DATA = new ContactFormModel(
  "James Mooore",
  "james.test@gmail.com",
  "01235469878",
  "Need more room",
  "Rooms look great but I would love to have more room types to book",
);

export const EMPTY_CONTACT_DATA = new ContactFormModel("", "", "", "", "");

export const NEW_GUEST: IGuestInfo = {
  firstName: "Mandy",
  lastName: "Layla",
  phone: "01235469877",
  email: "mandy.layla.test@gmail.com",
};

export const BOOKING_OPTION: IBookingOptions = {
  startDate: generateBookingDates().checkinDate,
  endDate: generateBookingDates().checkoutDate,
  roomType: "Double",
};
