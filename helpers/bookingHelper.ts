import { Page, expect } from "@playwright/test";
import { getBookingUI } from "../locators/booking.locators";
import { IBookingDate, IUserBookingInfo } from "../types/booking.interface";
import { generateBookingDates } from "../data/bookingData";

export const selectBookingDates = async (page: Page, dates: IBookingDate) => {
  const bookingUI = getBookingUI(page);
  await bookingUI.selectDateUI.checkinInput.fill(dates.checkinDate);
  await bookingUI.selectDateUI.checkoutInput.fill(dates.checkoutDate);
  await bookingUI.selectDateUI.checkAvailabilityBtn.click();
};

export const selectRoomByName = async (page: Page, roomType: string) => {
  const bookingUI = getBookingUI(page);
  const bookBtn = bookingUI.selectRoomCardUI.bookNowBtn(roomType);
  try {
    await bookBtn.waitFor({ state: "visible" , timeout: 5000});
    await bookBtn.click();
    await page.waitForURL("**/reservation/**");
    return true;
  } catch (error) {
    console.log(`${roomType} Room is not available on UI`);
    return false;
  }
};

export const fillBookingInfo = async (
  page: Page,
  userInfo: IUserBookingInfo,
) => {
  const bookingUI = getBookingUI(page);
  await bookingUI.bookingFormUI.firstNameInput.fill(userInfo.firstName);
  await bookingUI.bookingFormUI.lastNameInput.fill(userInfo.lastName);
  await bookingUI.bookingFormUI.emailInput.fill(userInfo.email);
  await bookingUI.bookingFormUI.phoneInput.fill(userInfo.phone);
};

export const submitBookingInfo = async (page: Page) => {
  const bookingUI = getBookingUI(page);
  await bookingUI.bookingFormUI.finalReserveBtn.click();
};

export const checkBookingSuccess = async (page: Page) => {
  const bookingUI = getBookingUI(page);
  try {
    await expect(bookingUI.successBookingUI.confirmedHeading).toBeVisible({
      timeout: 5000,
    });
    return true;
  } catch (error) {
    console.log("Booking failed since web could not load");
  }
  return false;
};

export const getValidationOfAllEmptyFields = async (page: Page) => {
  const bookingUI = getBookingUI(page);
  await page.waitForLoadState("domcontentloaded");
  let errors: string[] = [];
  errors = await bookingUI.bookingFormUI.allValidationMsg.allInnerTexts();
  /**
   * UI hiển thị list message hay thay đổi thứ tự các message
   * nên cần sort lại mảng để so sánh sau này
   */
  return errors.toSorted();
};

export const retryBookingFlow = async (
  page: Page,
  bookingDate: IBookingDate,
  roomName: string,
  userInfo: IUserBookingInfo,
  isSuccess: boolean,
): Promise<IBookingDate> => {
  const bookingUI = getBookingUI(page);
  const maxRetries: number = 3;

  // nếu lần đầu book thành công, k chạy tiếp retry loop
  if (isSuccess) return bookingDate;

  /**
   * Sau lần đầu thất bại, bắt đầu retry bằng cách quay lại home
   * và chọn lại ngẫu nhiên ngày mới, tiếp các bước chọn phòng, điền
   * thông tin. Gán lại giá trị isSuccess sau mỗi lần loop
   * nếu thành công dừng loop và trả về bookingDate mới.
   * throw error nếu quá 3 lần retry và dừng test
   */
  for (let retry = 1; retry <= maxRetries; retry++) {
    console.log(`Retry booking attempt ${retry} / ${maxRetries} ...`);
    await page.reload();
    await page.waitForLoadState("domcontentloaded");
    await bookingUI.viewRoomDetailUI.homeBreadcrumb.click();

    //Update bookingDate bằng ngày mới cho mỗi lần retry
    bookingDate = generateBookingDates();
    await expect(bookingUI.selectDateUI.checkinInput).toBeVisible();
    await selectBookingDates(page, bookingDate);

    /** Kiểm tra phòng có hiển thị trên UI hay k, nếu k hiện nhưng vẫn còn lượt
     * retry, vẫn tiếp tục lượt retry mới
     */
    const isRoomSelected = await selectRoomByName(page, roomName);
    if (!isRoomSelected) {
      console.log(
        `Rety attempt ${retry} failed to select room. ${roomName} room not available`,
      );
      if (retry === maxRetries) {
        throw new Error(
          `Max ${maxRetries} retries reached but booking still failed `,
        );
      }
      continue;
    }

    //Click Reverse để mở form điền thông tin booking
    await bookingUI.viewRoomDetailUI.firstReserveBtn.click();

    await fillBookingInfo(page, userInfo);
    await submitBookingInfo(page);

    //Gán lại giá trị kiểm tra đặt thành công trong lượt retry k
    isSuccess = await checkBookingSuccess(page);

    if (isSuccess) {
      console.log(`Booking success on retry attempt ${retry}`);
      return bookingDate;
    }

    if (retry === maxRetries) {
      throw new Error(
        `Max ${maxRetries} retries reached but booking still failed `,
      );
    }
  }
  return bookingDate;
};
