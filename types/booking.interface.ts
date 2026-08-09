export interface IUserBookingInfo {
    firstName: string, 
    lastName: string, 
    email: string,
    phone: string
}

export interface IBookingDate {
    checkinDate: string, 
    checkoutDate: string
}

export interface IValidationTcs extends IUserBookingInfo {
    error: string | string[], 
    desc: string, 
}