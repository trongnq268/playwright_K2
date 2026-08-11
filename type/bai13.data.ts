interface IGuestInfo {
    firtName:string,
    lastName:string,
    email:string,
    phone: string
}

interface IContactForm {
    name:string,
    email:string,
    phone:string,
    subject:string,
    description:string,
}

class GuestInfo {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
    ) {}

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

export const guest = new GuestInfo(
    "Nguyễn",
    "Đức An",
    "nguyenducan03.tm@gmail.com",
    "0123456789"
);

