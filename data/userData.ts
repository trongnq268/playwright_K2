import { IUserRegister, IUserLogin, IAddress } from "../types/user.interface";
import { faker } from "@faker-js/faker";

export const INVALID_LOGIN_DATA: IUserLogin = {
  email: "test.hellomonday@mailsac.com",
  password: "123456789***",
};

export const EXISTING_EMAIL_DATA = {
  name: "Hoang Ha",
  email: " test.hellomonday@mailsac.com",
};

export const REGISTER_DATA: IUserRegister = {
  name: faker.person.middleName(),
  email: `test_${Date.now()}@mailsac.com`,
  password: "Password@1",
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phone: "04324567885",
  day: 12,
  month: "October",
  year: 1999,
};

export const ADDRESS_DATA: IAddress = {
  company: "CARPENTER Limited",
  country: "Australia",
  address1: "201 Sydney Road",
  state: "VIC",
  city: "Coburg",
  zipcode: "3058",
  phone: "04231668835",
};
