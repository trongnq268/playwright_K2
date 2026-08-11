import { test, expect } from '@playwright/test';
import { ContactSection } from '../pages/contact.section';
import { RoomBookingSection } from '../pages/room-booking.section';
import { GuestInfo } from '../models/guest-info.model';
import { IBookingOptions } from '../models/booking-options.model';

test.describe('Bài 5 - Room Booking E2E', () => {
  let contactSection: ContactSection;
  let roomBookingSection: RoomBookingSection;

  test.beforeEach(async ({ page }) => {
    contactSection = new ContactSection(page);
    roomBookingSection = new RoomBookingSection(page);
    await contactSection.goto();
  });

  test('Đặt phòng thành công với thông tin hợp lệ', async () => {
    const guest = new GuestInfo('Tran', 'Thi B', 'tranthib@example.com', '0912345678901');

    const bookingOptions: IBookingOptions = {
      roomType: 'Single',
      startDate: '2026-09-10',
      endDate: '2026-09-12',
    };

    // 1. Mở modal đặt phòng
    await roomBookingSection.openBookingModal(bookingOptions.roomType);

    // 2. Chọn ngày lưu trú
    await roomBookingSection.selectDates(bookingOptions);

    // 3. Nhập thông tin khách hàng
    await roomBookingSection.fillBookingDetails(guest);

    // 4. Xác nhận đặt phòng
    await roomBookingSection.confirmBooking();

    // 5. Kiểm tra thông báo thành công
    const isConfirmed = await roomBookingSection.getBookingConfirmation();
    expect(isConfirmed).toBeTruthy();
  });
});
