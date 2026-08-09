import {
  IBookingDate,
  IUserBookingInfo,
  IValidationTcs,
} from "../types/booking.interface";

export const dynamicUserInfo = (): IUserBookingInfo => {
  return {
    firstName: "Test",
    lastName: "Jammy",
    email: `jammy_${Date.now()}@gmail.com`,
    phone: "09123456789",
  };
};

export const generateBookingDates = (): IBookingDate => {
  const checkin = new Date(); // Lấy ngày hôm nay
  
  // 1. Cộng thêm số ngày ngẫu nhiên cho Checkin (ví dụ từ 1 đến 365 ngày tới)
  // Chọn date range rộng để giảm khả năng bị trùng ngày
  const randomDays = Math.floor(Math.random() * 365) + 1;
  checkin.setDate(checkin.getDate() + randomDays);

  // 2. Cho Checkout sau Checkin 2 ngày
  const checkout = new Date(checkin);
  checkout.setDate(checkin.getDate() + 2);

  // 3. Hàm nhỏ để đổi dạng Date sang "YYYY-MM-DD"
  const format = (date: Date) => date.toLocaleDateString('en-CA');

  return {
    checkinDate: format(checkin),   // Ví dụ: "2026-08-15"
    checkoutDate: format(checkout)  // Ví dụ: "2026-08-17"
  };
}

export const dynamicValidValidation = (): IValidationTcs[] => {
  return [
    {
      firstName: "Anh",
      lastName: "Jammy",
      email: `jammy_${Date.now()}@gmail.com`,
      phone: "09123456789",
      desc: "Valid first name with min 3 chars",
      error: "",
    },
    {
      firstName: "Anhnhonhipopipapep",
      lastName: "Jammy",
      email: `jammy_${Date.now()}@gmail.com`,
      phone: "09123456789",
      desc: "Valid first name with max 18 chars",
      error: "",
    },
  ];
};

export const INVALID_VALIDATION_TCs: IValidationTcs[] = [
  {
    firstName: "An",
    lastName: "Jammy",
    email: `jammy_${Date.now()}@gmail.com`,
    phone: "09123456789",
    desc: "Invalid first name less than 3 chars (input 2 chars)",
    error: "size must be between 3 and 18",
  },
  {
    firstName: "Anhnhonhipopipapepu",
    lastName: "Jammy",
    email: `jammy_${Date.now()}@gmail.com`,
    phone: "09123456789",
    desc: "Invalid first name more than max 18 chars (input 19 chars)",
    error: "size must be between 3 and 18",
  },
  {
    firstName: "Anh",
    lastName: "Jammy",
    email: `jammy_${Date.now()}@.com`,
    phone: "09123456789",
    desc: "Invalid email format",
    error: "must be a well-formed email address",
  },
  {
    firstName: "Anhnhonhipopipapep",
    lastName: "Jammy",
    email: `jammy_${Date.now()}@gmail.com`,
    phone: "091234567aa", // gom ca chu va so 11 char
    desc: "Invalid phone with alphabet character",
    error: "size must be between 11 and 21",
  },
  {
    firstName: "Anhnhonhipopipapep",
    lastName: "Jammy",
    email: `jammy_${Date.now()}@gmail.com`,
    phone: "09123",
    desc: "Invalid phone with less than 11 digits",
    error: "size must be between 11 and 21",
  },
  {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    desc: "All required fields empty",
    error: [
      "size must be between 11 and 21",
      "Lastname should not be blank",
      "Firstname should not be blank",
      "must not be empty",
      "size must be between 3 and 30",
      "must not be empty",
      "size must be between 3 and 18",
    ],
  },
];
