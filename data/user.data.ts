import {
  IUserLogin,
  IUserRegister,
  IUserAddress,
} from "../types/user.interface";

export const createDynamicUserData = (): {
  user: IUserRegister;
  address: IUserAddress;
} => {
  const timeStamp = Date.now();
  const email = `autotest_${timeStamp}@gmail.com`;
  const user: IUserRegister = {
    name: `Auto User ${timeStamp}`,
    email: email,
    password: "Password@123",
    date: "15",
    month: "May",
    year: "1995",
  };

  const address: IUserAddress = {
    firstName: "Nguyen",
    lastName: "An",
    company: "OnePay Corp",
    address: "123 Main St",
    address2: "Suite 400",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    zipCode: "90001",
    mobilePhone: "0912345678",
  };
  return { user, address };
};

export const createMandatoryUserData = (): {
  user: IUserRegister;
  address: IUserAddress;
} => {
  const timeStamp = Date.now();
  const email = `mandatory_${timeStamp}@gmail.com`;
  const user: IUserRegister = {
    name: `Tester Mandatory ${timeStamp}`,
    email: email,
    password: "Password@123",
    date: "",
    month: "",
    year: "",
  };

  const address: IUserAddress = {
    firstName: "Tran",
    lastName: "Binh",
    address: "456 Le Loi St",
    country: "India",
    state: "Hanoi",
    city: "Ba Dinh",
    zipCode: "100000",
    mobilePhone: "0987654321",
  };
  return { user, address };
};

export const EXISTING_EMAIL_DATA = {
  name: "Test Duplicate Email",
  email: "existed_user_test@example.com",
};

export const INVALID_LOGIN_DATA: IUserLogin = {
  email: "invalid_user_99999@test.com",
  password: "WrongPassword123",
};

