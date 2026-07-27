import { IUserRegister, IUserLogin, IAddress } from "../types/user.interface";

export const INVALID_LOGIN_DATA: IUserLogin = {
  email: "invalid_email_test@mailsac.com",
  password: "WrongPassword123!",
};

export const EXISTING_EMAIL_DATA = {
  name: "Hoang Ha",
  email: "test.hellomonday@mailsac.com",
};

export const createDynamicUserData = (): { user: IUserRegister; address: IAddress } => {
  const timestamp = Date.now();
  const firstName = "Học Viên";
  const lastName = `Auto_${timestamp}`;
  const name = `${firstName} ${lastName}`;
  const email = `user_${timestamp}@mailsac.com`;

  const user: IUserRegister = {
    name,
    email,
    password: "Password123!",
    firstName,
    lastName,
    phone: "0987654321",
    day: "15",
    month: "August",
    year: "1998",
  };

  const address: IAddress = {
    firstName,
    lastName,
    company: "CARPENTER Limited",
    country: "Australia",
    address1: "201 Sydney Road",
    address2: "Suite 100",
    state: "VIC",
    city: "Coburg",
    zipcode: "3058",
    phone: "0987654321",
  };

  return { user, address };
};

export const VALID_REGISTER_DATA: IUserRegister = {
  name: "Học Viên Auto",
  email: `user_${Date.now()}@mailsac.com`,
  password: "Password@1",
  firstName: "Học Viên",
  lastName: "Auto",
  phone: "04324567885",
  day: "12",
  month: "October",
  year: "1999",
};

export const VALID_ADDRESS_DATA: IAddress = {
  firstName: "Học Viên",
  lastName: "Auto",
  company: "CARPENTER Limited",
  country: "Australia",
  address1: "201 Sydney Road",
  address2: "Apt 4B",
  state: "VIC",
  city: "Coburg",
  zipcode: "3058",
  phone: "04231668835",
};
