import { IUserLogin, IUserRegister, IUserAddress } from '../types/user_type';

// Sinh data động theo thời gian chạy
export const createDynamicUserData = (): {user: IUserRegister, address: IUserAddress} =>{
    const timestamp = Date.now();
    const email = `email_test_${timestamp}@gmail.com`;
    const user: IUserRegister = {
        name: 'auto test',
        email: email,
        password: 'Password@123',
        day: '1',
        month: 'November',
        year: '2002',
    }

    const address: IUserAddress = {
        firstName: 'Test',
        lastName: 'Nhung',
        company: 'company',
        address: '311 Trường Chinh',
        address2: '315 Trường Chinh',
        country: 'Canada',
        state: 'Thanh xuân',
        city: 'Hà Nội',
        zipcode: '1000000',
        mobilePhone: '0987654321',
    }

    return {user, address};
}

// Data đăng nhập hợp lệ
export const validLoginData = (): {user: IUserLogin} => {
    const user: IUserLogin = {
        email: 'nhnhung1112@gmail.com',
        password: 'Password@123',
    }
    return {user};
}

// Data log in không hợp lệ 

export const invalidLoginData = (): {user: IUserLogin} =>{
    const user: IUserLogin = {
        email: 'test123@gmail.com',
        password: '12345678',
    }
    return {user};
}