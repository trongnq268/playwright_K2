export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  day: number;
  month: string;
  year: number;
};

export interface IAddress {
  company?: string;
  country: string;
  address1: string;
  address2?: string;
  state: string;
  city: string;
  zipcode: string;
}
    