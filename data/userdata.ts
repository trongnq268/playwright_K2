import { IUserRegister, IUserLogin, IUserAdress } from "../types/user.interface";

//Data cho Đăng ký mới (Dùng Interface IUserRegister)
export const VALID_REGISTER_DATA: IUserRegister = {
    name: 'Học Viên Auto',
    email: `user_${Date.now()}@gmail.com`, //email động
    password: 'MatKhau123!',
    day: '15',
    month: '8',
    year: '1998',

};

//Data cho Đăng ký trùng email
export const EXISTING_EMAIL_DATA = {
    name: 'Học Viên Auto',
    email: 'email_da_ton_tai@gmail.com',
};

//Data cho Đăng nhập hợp lệ
export const VALID_LOGIN_DATA: IUserLogin = {
    email: 'tai_khoan_hop_le@gmail.com',
    password: 'MatKhauDung123',
};

//Data cho Đăng nhập thất bại
export const INVALID_LOGIN_DATA: IUserLogin = {
    email: 'email_sai@gmail.com',
    password: 'MatKhauSai123',
};
