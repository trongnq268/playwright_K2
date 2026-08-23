import { test, expect } from '@playwright/test';
import { ContactSection } from '../../pages/homwork13_page/contact.section';
import { RoomBookingSection } from '../../pages/homwork13_page/room-booking.section';
import { GuestInfo } from '../../pages/homwork13_page/guestInfo.page';
import { IBookingOptions } from '../../types/bookingOptions.type';

test.describe('Bài 5: Viết Test Script E2E Đặt phòng Khách sạn', () =>{

    let contactSection: ContactSection;
    let roomBookingSection: RoomBookingSection;
    let guestInfo: GuestInfo;

    //Khởi tạo class và nav tới web
    test.beforeEach('Khởi tạo page class và navigate tới web', async({page}) =>{
        contactSection = new ContactSection(page);
        roomBookingSection = new RoomBookingSection(page);

        await page.goto('https://automationintesting.online/');
    });

    //Thực hiện action và assert
    test('Test case đặt phòng thành công luồng E2E', async({page}) =>{
        guestInfo = new GuestInfo(
            'Nhung',
            'Nguyen',
            'nhungnh@gmail.com',
            '09876543212'
        );
        
        const iBookingOptions: IBookingOptions = {
            roomType: 'Single',
            startDate: '2026-08-18',
            endDate: '2026-08-25',
        };

        await roomBookingSection.openBookingModal(iBookingOptions.roomType);
        await roomBookingSection.selectDates(iBookingOptions);
        await roomBookingSection.fillBookingDetails(guestInfo);
        await roomBookingSection.confirmBooking();

        const isConfirmed = await roomBookingSection.getBookingConfirmation();
        expect(isConfirmed).toBe(true);

        await expect(page.getByText(`${iBookingOptions.startDate} - ${iBookingOptions.endDate}`)).toBeVisible();
    });
});