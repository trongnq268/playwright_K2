/**
 * Bài 1 - Khai báo Interface & Đóng gói Data Model
 * IGuestInfo: mô tả cấu trúc dữ liệu của một khách hàng.
 */
export interface IGuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/**
 * GuestInfo triển khai (implements) IGuestInfo.
 * Dùng Shorthand Constructor để Typescript tự sinh property + gán giá trị.
 */
export class GuestInfo implements IGuestInfo {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string
  ) {}

  /** Trả về họ tên đầy đủ, ví dụ: "Nguyen Van A" */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
