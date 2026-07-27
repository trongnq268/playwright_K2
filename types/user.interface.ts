export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  phone: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  day: number | string;
  month: string;
  year: number | string;
}
