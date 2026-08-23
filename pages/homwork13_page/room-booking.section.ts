import { Page, Locator } from '@playwright/test';
import { IBookingOptions } from '../../types/bookingOptions.type';
import { IGuestInfo } from '../../types/guestInfo.type';

export class RoomBookingSection{
    constructor( private page: Page ){};
    // Dynamic Locator Method: tìm nút Book now đúng room type được truyền
    getRoomBookButton(roomType: string): Locator{
        const roomCard = this.page.locator('.room-card').filter({ has: this.page.locator('.card-title', { hasText: roomType }) });
        return roomCard.getByRole('link', { name: 'Book now' });
    }
    // Click button Book now đúng room type được truyền, chờ trang reservation (chứa lịch chọn ngày) load xong
    async openBookingModal(roomType: string): Promise<void>{
        await this.getRoomBookButton(roomType).click();
        await this.page.locator('.rbc-calendar').waitFor({ state: 'visible' });
    }
    // Chọn khoảng ngày check-in/check-out trên lịch (react-big-calendar) của trang reservation
    async selectDates(options: IBookingOptions): Promise<void>{
        const calendar = this.page.locator('.rbc-calendar');
        const toolbarLabel = calendar.locator('.rbc-toolbar-label');
        const nextButton = calendar.getByRole('button', { name: 'Next' });
        const backButton = calendar.getByRole('button', { name: 'Back' });

        // Parse thủ công "YYYY-MM-DD" thành Date theo giờ local, tránh lệch ngày do new Date(string) hiểu theo UTC
        const [startYear, startMonth, startDay] = options.startDate.split('-').map(Number);
        const [endYear, endMonth, endDay] = options.endDate.split('-').map(Number);
        const startDate = new Date(startYear, startMonth - 1, startDay);
        // Lịch tính checkout = (ô được kéo đến) + 1 ngày, nên phải kéo tới ô "đêm cuối" (endDate - 1 ngày)
        // để checkout hiển thị trên site khớp đúng với options.endDate
        const dragEndDate = new Date(endYear, endMonth - 1, endDay - 1);

        // Điều hướng lịch (Next/Back) tới đúng tháng/năm chứa ngày check-in
        const targetMonthLabel = startDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        let guard = 0;
        while ((await toolbarLabel.innerText()) !== targetMonthLabel && guard < 24){
            const currentLabel = await toolbarLabel.innerText();
            const currentMonthDate = new Date(currentLabel);
            if (currentMonthDate < startDate){
                await nextButton.click();
            } else {
                await backButton.click();
            }
            guard++;
        }

        // Ô ngày hợp lệ là ô thuộc tháng đang hiển thị (không có class rbc-off-range), match theo số ngày 2 chữ số (vd "05")
        const getDayCell = (date: Date): Locator => {
            const dayLabel = date.getDate().toString().padStart(2, '0');
            return calendar
                .locator('.rbc-date-cell:not(.rbc-off-range)')
                .filter({ has: this.page.getByRole('button', { name: dayLabel, exact: true }) });
        };

        const startBox = await getDayCell(startDate).boundingBox();
        const endBox = await getDayCell(dragEndDate).boundingBox();
        if (!startBox || !endBox){
            throw new Error(`Không tìm thấy ô ngày ${options.startDate} hoặc ${options.endDate} trên lịch.`);
        }

        // react-big-calendar chỉ nhận diện chọn KHOẢNG ngày qua thao tác kéo chuột (drag),
        // click đơn thuần vào từng ô không kích hoạt việc chọn range
        await this.page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2, { steps: 5 });
        await this.page.mouse.up();
    }
    // Điền thông tin khách hàng từ GuestInfo (bấm Reserve Now để mở form nhập thông tin trước khi điền)
    async fillBookingDetails(guest: IGuestInfo): Promise<void>{
        await this.page.getByRole('button', { name: 'Reserve Now' }).click();
        await this.page.getByRole('textbox', { name: 'Firstname' }).waitFor({ state: 'visible' });

        await this.page.getByRole('textbox', { name: 'Firstname' }).fill(guest.firstName);
        await this.page.getByRole('textbox', { name: 'Lastname' }).fill(guest.lastName);
        await this.page.getByRole('textbox', { name: 'Email' }).fill(guest.email);
        await this.page.getByRole('textbox', { name: 'Phone' }).fill(guest.phone);
    }
    // Method confirmBooking để click vào button Reserve now
    async confirmBooking(): Promise<void>{
        await this.page.getByRole('button', { name: 'Reserve Now' }).click();
    }
    // Method getBookingConfirmation kiểm tra booking được tạo thành công hay không
    async getBookingConfirmation(): Promise<boolean> {
        const confirmedHeading = this.page.getByRole('heading', {
            name: 'Booking Confirmed',
            level: 2
        });

        await confirmedHeading.waitFor({ state: 'visible' });

        return await confirmedHeading.isVisible();
    }
}