//Interface cho Địa chỉ và thông tin cá nhân
export interface IUserAdress {
    firstName: string;
    lastName: string;
    company?: string; //Optional field
    address: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    mobilePhone: string;

}

//Interface cho Thông tin đăng ký tài khoản đầy đủ
export interface IUserRegister {
    name: string;
    email: string;
    password: string;
    day: number | string;
    month: string;
    year: number | string;

}

//Interface cho thông tin đăng nhập
export interface IUserLogin {
    email: string;
    password: string;
}