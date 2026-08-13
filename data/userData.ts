import { userAddress, userLogin, userResgister } from "../type/user.interface";


export const createUserDynamicData =():{user: userResgister, address: userAddress} => {
    const timeStamp: number = Date.now();
    const email = `pttautotest_${timeStamp}@gmail.com`;
    //const name = 'Auto Test';
    const user: userResgister = {
        name: 'PTT Auto Test',
        email: email,
        password: "PW123@456",
        date: 15,  // | kys tu hoac, cho phep nhajp number or string
        month: "August",
        year: 1999,
    };
    const address: userAddress ={
        firstName: 'PTT Auto',
        lastName: 'Test',
        company : 'Company ABC',
        adress: 'AD 1',
        adress2 : 'AD2',
        country: 'India',
        state: 'State ABC',
        city: 'City A',
        zipCode: '001-123',
        mobileNumber: '123-456-789'
    }
    return {user, address};
};

export const validRegisterData: userResgister = {
        name: 'PTT Auto Test',
        email: `pttautotest_${Date.now()}@gmail.com`,
        password: "PW123@456",
        date: 15,  // | kys tu hoac, cho phep nhajp number or string
        month: "August",
        year: 1999,
};

export const vaildAddressData: userAddress = {
        firstName: 'PTT Auto',
        lastName: 'Test',
        company : 'Company ABC',
        adress: 'AD 1',
        adress2 : 'AD2',
        country: 'India',
        state: 'State ABC',
        city: 'City A',
        zipCode: '001-123',
        mobileNumber: '123-456-789'

}


// Data dang kys trung email

export const existEmailData = {
    name: "Le Thi B",
    email: "ptthu4w@gmail.com",
};

export const invalidLoginData = {
    email: "abc123@gmail.com",
    password: "12334545",
};




