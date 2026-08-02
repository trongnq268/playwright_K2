export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  date: number | string;
  month: string;
  year: number | string;
}

export interface IUserAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  mobilePhone: string;
}
