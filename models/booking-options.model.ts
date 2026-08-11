/**
 * Bài 3 - IBookingOptions: dữ liệu cấu hình cho một lượt đặt phòng.
 */
export interface IBookingOptions {
  roomType: string;
  startDate: string; // định dạng 'YYYY-MM-DD'
  endDate: string; // định dạng 'YYYY-MM-DD'
}
