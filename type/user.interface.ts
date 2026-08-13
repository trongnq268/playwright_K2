
export interface userLogin{
    email: string;
    password: string;
}

export interface userResgister{
    name: string;
    email: string;
    password: string;
    date: number | string;  // | kys tu hoac, cho phep nhajp number or string
    month: string;
    year: number|string;
}

export interface userAddress{
    firstName: string;
    lastName: string;
    company?: string;
    adress: string;
    adress2?: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    mobileNumber: string;
};

