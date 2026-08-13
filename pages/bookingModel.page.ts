export class GuestInfo{
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
    ){}

    getFullName(): string{
        return `${this.firstName} ${this.lastName}`.trim();
    }
}

export class BookingRequest{
    constructor(
        public roomPrice: number,
        public checkIn: Date,
        public checkOut: Date,
        public guest: GuestInfo,
    ){}

    getNights(): number{
        const nightsInMil = this.checkOut.getTime() - this.checkIn.getTime();
        const nightsInDay = nightsInMil / (1000*6060*24);
        return nightsInDay;
    }

    calculateTotal(): number{
        return this.getNights() * this.roomPrice;
    }
}