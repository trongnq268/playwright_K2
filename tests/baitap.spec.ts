import { expect, test } from '@playwright/test';

test('testcase', async () => {

// thong tin khach dat phong
class Guest_info {
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


// thong tin dat phong
class Booking_request {
    constructor(
        public room_price: number,
        public check_in: Date,
        public check_out: Date,
        public guest: Guest_info,
    ) {}

    get_nights(): number {
        const diff_time = this.check_out.getTime() - this.check_in.getTime();
        const diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24));
        return diff_days;
    }

    calculateTotalPrice(): number {
        return this.get_nights() * this.room_price;
    }
}
// thong tin khach hang
const guest = new Guest_info(
    "Nguyen",
    "Duc An",
    "nguyenducan03.tm@gmail.com",
    "0123456789"
);
// thoi gian dat phong
const check_in = new Date("2026-08-10");
const check_out = new Date("2026-08-15");


// booking
const booking = new Booking_request(
    1000000,
    check_in,
    check_out,
    guest
);
// in ra
console.log("=== THONG TIN DAT PHONG ===");
console.log("Ten khach hang:", booking.guest.getFullName());
console.log("Email:", booking.guest.email);
console.log("So dien thoai:", booking.guest.phone);
console.log("Ngay nhan phong:", booking.check_in.toLocaleDateString());
console.log("Ngay tra phong:", booking.check_out.toLocaleDateString());
console.log("So dem luu tru:", booking.get_nights());
console.log("Gia phong/dem:", booking.room_price.toLocaleString());
console.log("Tong tien:", booking.calculateTotalPrice().toLocaleString());

});