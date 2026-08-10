/**
 * Bài 1: Quản lý Dữ liệu Đặt phòng (BookingModel)
 * 
 * 1. Class GuestInfo:
 *    - Sử dụng Shorthand Constructor: constructor(public firstName: string, public lastName: string, public email: string, public phone: string) {}
 *    - Method getFullName(): string
 * 
 * 2. Class BookingRequest:
 *    - Attributes: public roomPrice: number, public checkIn: Date, public checkOut: Date, public guest: GuestInfo
 *    - Method getNights(): number
 *    - Method calculateTotalPrice(): number
 */

export class GuestInfo {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string
  ) {}

  /**
   * Trả về họ tên đầy đủ của khách hàng
   * @returns Họ và tên đầy đủ (Ví dụ: "John Doe")
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}

export class BookingRequest {
  constructor(
    public roomPrice: number,
    public checkIn: Date,
    public checkOut: Date,
    public guest: GuestInfo
  ) {}

  /**
   * Tính số đêm lưu trú giữa checkOut và checkIn
   * @returns Số đêm lưu trú (number)
   */
  getNights(): number {
    const diffInMs = this.checkOut.getTime() - this.checkIn.getTime();
    const msPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.ceil(diffInMs / msPerDay);
    return nights > 0 ? nights : 0;
  }

  /**
   * Tính tổng tiền dịch vụ (số đêm * giá phòng/đêm)
   * @returns Tổng tiền thanh toán (number)
   */
  calculateTotalPrice(): number {
    return this.getNights() * this.roomPrice;
  }
}

// ==========================================
// VÍ DỤ SỬ DỤNG (DEMO)
// ==========================================
const sampleGuest = new GuestInfo("John", "Doe", "john.doe@example.com", "0901234567");
const checkIn = new Date("2026-08-15");
const checkOut = new Date("2026-08-18");
const sampleBooking = new BookingRequest(150, checkIn, checkOut, sampleGuest);

console.log("=== THÔNG TIN KHÁCH HÀNG ===");
console.log("Họ và tên:", sampleGuest.getFullName());
console.log("Email:", sampleGuest.email);
console.log("Số điện thoại:", sampleGuest.phone);

console.log("\n=== THÔNG TIN CHI TIẾT ĐẶT PHÒNG ===");
console.log("Ngày check-in:", checkIn.toISOString().split("T")[0]);
console.log("Ngày check-out:", checkOut.toISOString().split("T")[0]);
console.log("Giá phòng/đêm:", `$${sampleBooking.roomPrice}`);
console.log("Số đêm lưu trú:", `${sampleBooking.getNights()} đêm`);
console.log("Tổng tiền thanh toán:", `$${sampleBooking.calculateTotalPrice()}`);
