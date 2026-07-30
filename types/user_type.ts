// type khai báo interface (kiểu dữ liệu dùng chung)

// interface cho thông tin đăng nhập
export interface IUserLogin {
    email: string,
    password: string,
}

// interface thông tin đăng ký tài khoản
export interface IUserRegister {
    name: string,
    email: string,
    password: string,
    day: string | number,
    month: string,
    year: string | number,
}

// interface thông tin địa chỉ đăng ký tài khoản
export interface IUserAddress {
    firstName: string,
    lastName: string,
    company ?: string,
    address: string,
    address2 ?: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobilePhone: string,
}