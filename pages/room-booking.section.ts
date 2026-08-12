import { Page, Locator } from '@playwright/test';
import { GuestInfo } from '../models/guest-info.model';
import { IBookingOptions } from '../models/booking-options.model';

/**
 * Bài 3 - Page Class cho Modal Đặt phòng.
 * NOTE: automationintesting.online dùng react-big-calendar để chọn ngày,
 * nên selector ngày (.rbc-date-cell) có thể cần chỉnh lại tuỳ phiên bản UI.
 * Khuyến nghị chạy `npx playwright codegen https://automationintesting.online/`
 * để soi đúng DOM thật rồi cập nhật các getter bên dưới.
 */
export class RoomBookingSection {
  constructor(private page: Page) {}

  /** Dynamic Locator: tìm nút "Book now" của đúng loại phòng (roomType). */
  // sửa lại locator của các button
  getRoomBookButton(roomType: string): Locator {
    return this.page
      .locator('.room-info, .card')
      .filter({ hasText: roomType })
      .getByRole('button', { name: /book now/i });
  }

  get firstNameInput(): Locator {
    return this.page.locator('input[placeholder="Firstname"]');
  }

  get lastNameInput(): Locator {
    return this.page.locator('input[placeholder="Lastname"]');
  }

  get emailInput(): Locator {
    return this.page.locator('input[placeholder="Email"]');
  }

  get phoneInput(): Locator {
    return this.page.locator('input[placeholder="Phone"]');
  }

  get confirmBookingBtn(): Locator {
    return this.page.getByRole('button', { name: 'Book', exact: true });
  }

  get bookingSuccessMessage(): Locator {
    return this.page.getByText(/booking successful/i);
  }

  /** Click mở popup/khu vực đặt phòng của loại phòng tương ứng. */
  async openBookingModal(roomType: string): Promise<void> {
    await this.getRoomBookButton(roomType).click();
  }

  /** Chọn khoảng ngày lưu trú trên lịch (calendar) theo options. */
  // chọn ngày = cách điền data vào 2 text box
  async selectDates(options: IBookingOptions): Promise<void> {
    const startDay = new Date(options.startDate).getDate().toString();
    const endDay = new Date(options.endDate).getDate().toString();

    await this.page.locator('.rbc-date-cell', { hasText: startDay }).first().click();
    await this.page.locator('.rbc-date-cell', { hasText: endDay }).nth(1).click();
  }

  /** Điền thông tin khách hàng từ đối tượng GuestInfo vào form đặt phòng. */
  async fillBookingDetails(guest: GuestInfo): Promise<void> {
    await this.firstNameInput.fill(guest.firstName);
    await this.lastNameInput.fill(guest.lastName);
    await this.emailInput.fill(guest.email);
    await this.phoneInput.fill(guest.phone);
  }

  async confirmBooking(): Promise<void> {
    await this.confirmBookingBtn.click();
  }

  async getBookingConfirmation(): Promise<boolean> {
    return await this.bookingSuccessMessage.isVisible();
  }
}
