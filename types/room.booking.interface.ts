export interface IGuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface IContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
}

export interface IBookingOptions {
  roomType: string;
  startDate: string;
  endDate: string;
}
