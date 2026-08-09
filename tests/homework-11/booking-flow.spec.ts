import { test, expect } from "@playwright/test";
import { IBookingDate } from "../../types/booking.interface";
import { getBookingUI } from "../../locators/booking.locators";
import { generateTestCaseID } from "../../utils/data-generator";
import {
  checkBookingSuccess,
  fillBookingInfo,
  getValidationOfAllEmptyFields,
  retryBookingFlow,
  selectBookingDates,
  selectRoomByName,
  submitBookingInfo,
} from "../../helpers/bookingHelper";
import {
  dynamicUserInfo,
  INVALID_VALIDATION_TCs,
  dynamicValidValidation,
  generateBookingDates,
} from "../../data/bookingData";

test.describe("Booking flow and fields validation", () => {
  const module = "booking";
  const roomName: string = "Single";
  let bookingUI: ReturnType<typeof getBookingUI>;
  let dynamicDates: IBookingDate;

  test.beforeEach(async ({ page }) => {
    bookingUI = getBookingUI(page);
    //để tránh book trùng ngày, checkin checkout date được chọn ngẫu nhiên
    dynamicDates = generateBookingDates();

    await test.step("Open booking web", async () => {
      await page.goto("https://automationintesting.online/");
      await page.waitForLoadState("networkidle");
    });

    await test.step("Select checkin checkout dates", async () => {
      await selectBookingDates(page, dynamicDates);
    });

    await test.step("Select Single Room", async () => {
      const maxRetries: number = 3;
      //phòng có hiển thị hay k dựa vào action chọn phòng, nếu phòng
      //k hiện isRoomSelected = false
      let isRoomSelected = await selectRoomByName(page, roomName);

      /**
       * Vì web có check phòng đã được đặt hay chưa, nếu đã được đặt trước đó, phòng
       * sẽ k hiện trên web UI nên cần retry chọn lại ngày mới.
       * Tối đa retry 3 lần, nếu quá sẽ throw Error và dừng test
       */

      //nếu lần chọn ngày đầu tiên phòng Single có hiện, k cần chạy retry
      if (isRoomSelected) return;

      //bắt đầu chọn lại ngày mới sau khi lần chọn đầu thấy phòng Single k hiển thị
      for (let retry = 1; retry <= maxRetries; retry++) {
        console.log(`Retry to select new dates attempt ${retry}...`);
        // tải lại web và chọn ngày mới
        await page.reload();
        await page.waitForLoadState("networkidle");
        await selectBookingDates(page, dynamicDates);

        // gán lại giá trị cho isRoomSelected và chạy vòng lặp tiếp nếu vẫn false
        isRoomSelected = await selectRoomByName(page, roomName);

        //nếu vẫn trong lượt chọn lại ngày mới, đã hiển thị phòng Single, log message thành công
        // và dừng loop
        if (isRoomSelected) {
          console.log(`Selected ${roomName} room successfully`);
          return;
        }

        //hiển thị message khi quá 3 lần retry vẫn k có phòng Single xuất hiện
        if (retry === maxRetries) {
          throw new Error(
            `Max ${maxRetries} retries but ${roomName} room is still not available on UI`,
          );
        }
      }
    });
  });

  test(
    `${generateTestCaseID(module, 1)}: Success E2E booking flow with valid booking data`,
    { tag: ["@e2e", "@happy_path", "@smoke"] },
    async ({ page }) => {
      let currentBookingDates: IBookingDate;

      //ACT
      await test.step("Fill in all required fields of booking form and retry booking if needed", async () => {
        //click button Reserve lần đầu để hiển thị form điền thông tin đặt phòng
        await bookingUI.viewRoomDetailUI.firstReserveBtn.click();
        await fillBookingInfo(page, dynamicUserInfo());
        await submitBookingInfo(page);
        // kiểm tra xem phòng đặt thành công k, vì thỉnh thoảng web hiện lỗi couldn't load
        // sau khi bấm submit
        const isSuccess = await checkBookingSuccess(page);

        /**Nếu isSuccess = false, bắt đầu retry lại với lần đầu mặc định lấy ngày theo beforeEach
         * chọn phòng Single, điền thông tin user và kiểm tra submit thành công k.
         * Nếu vẫn chưa thành công, tiếp tục retry tối đa 3 lần.
         * Dừng test và throw Error nếu quá 3 lần
         * */
        currentBookingDates = await retryBookingFlow(
          page,
          dynamicDates,
          roomName,
          dynamicUserInfo(),
          isSuccess,
        );
        await page.waitForLoadState("networkidle");
      });

      //ASSERT
      await test.step("Display booking confirmed dates", async () => {
        // so sánh ngày ngày được confirmed khớp với ngày đã chọn ban đầu (hoặc sau khi retry)
        await expect(bookingUI.successBookingUI.confirmedDatesText).toHaveText(
          `${currentBookingDates.checkinDate} - ${currentBookingDates.checkoutDate}`,
        );

        // kiểm tra button Return Home hiển thị
        await expect(bookingUI.successBookingUI.returnLink).toBeVisible();
      });
    },
  );

  /**
   * Nhóm các tcs kiểm tra giá trị BVA hợp lệ: Max BVA, Min BVA
   */
  for (let index = 0; index < dynamicValidValidation().length; index++) {
    test(
      `${generateTestCaseID(module, index + 2)}: Valid BVA validation - ${dynamicValidValidation()[index].desc}`,
      { tag: ["@valid_bva", "@bva_max", "@bva_min"] },
      async ({ page }) => {
        let currentBookingDates: IBookingDate;

        await test.step("Fill in valid bva min and max values and retry booking if needed", async () => {
          await bookingUI.viewRoomDetailUI.firstReserveBtn.click();
          // Điền thông tin vào form theo mảng các tcs với giá trị hợp lệ
          await fillBookingInfo(page, dynamicValidValidation()[index]);
          await submitBookingInfo(page);
          // kiểm tra sau Submit phòng được đặt thành công k
          const isSuccess = await checkBookingSuccess(page);

          // Nếu đặt chưa thành công, retry đặt lại phòng tối đa 3 lần
          currentBookingDates = await retryBookingFlow(
            page,
            dynamicDates,
            roomName,
            dynamicUserInfo(),
            isSuccess,
          );
        });

        await test.step("Verify validation message and booking flow", async () => {
          //vì đây là kiểm tra BVA hợp lệ, UI k hiển thị error message
          await expect(bookingUI.bookingFormUI.alertBox).toBeHidden();

          //kiểm tra đặt thành công, hiện thị đúng heading và ngày đã đặt
          await expect(
            bookingUI.successBookingUI.confirmedHeading,
          ).toBeVisible();
          await expect(
            bookingUI.successBookingUI.confirmedDatesText,
          ).toHaveText(
            `${currentBookingDates.checkinDate} - ${currentBookingDates.checkoutDate}`,
          );
        });
      },
    );
  }

  /**
   * Nhóm các tcs kiểm tra giá trị BVA, EP k hợp lệ và bỏ trống mandatory fields
   * Web k chặn nhập phone sai khi chứa ký tự alphabet nên TC007 sẽ fail
   */
  for (let index = 0; index < INVALID_VALIDATION_TCs.length; index++) {
    test(
      `${generateTestCaseID(module, index + 4)}: Invalid validation - ${INVALID_VALIDATION_TCs[index].desc}`,
      { tag: ["@invalid_bva", "@ep", "@mandatory_combination"] },
      async ({ page }) => {
        let expectedAllErr = INVALID_VALIDATION_TCs[index].error;

        await test.step("Fill in invalid data", async () => {
          // Click Reverse button lần đầu để hiện thị form điền thông tin
          await bookingUI.viewRoomDetailUI.firstReserveBtn.click();
          // Điền thông tin vào form theo mảng các tcs với giá trị k hợp lệ
          await fillBookingInfo(page, INVALID_VALIDATION_TCs[index]);
          await submitBookingInfo(page);
        });

        await test.step("Verify validation error message matching with each test case", async () => {
          await expect(bookingUI.bookingFormUI.alertBox).toBeVisible();
          // Lấy tất cả message hiển thị trên UI khi bỏ trống mandatory fields thành mảng string
          const actualAllErr = await getValidationOfAllEmptyFields(page);

          /**TH bỏ trống mandatory fields, error được lưu làm mảng string
           * nên cần kiểm tra khi nào loop chạy tới mảng error
           */
          if (Array.isArray(expectedAllErr)) {
            /** UI hiển thị list message k đồng nhất, thứ tự các message hay thay
             * đổi nên cần sort lại mảng error trước khi so sánh
             */
            expectedAllErr = expectedAllErr.toSorted();
            expect(actualAllErr).toEqual(expectedAllErr);

          } else {
            await expect(bookingUI.bookingFormUI.alertBox).toHaveText(
              INVALID_VALIDATION_TCs[index].error,
            );
          }
        });
      },
    );
  }

  test(
    `${generateTestCaseID(module, 10)}: Check cancel button`,
    { tag: ["@ui_control", "@state"] },
    async () => {
      const firstName = dynamicUserInfo().firstName;
      const lastName = dynamicUserInfo().lastName;

      await test.step("Input first name and last name", async () => {
        /**
         * Click Reverse button lần đầu để hiện thị form điền thông tin
         * Điền first name, last name
         */
        await expect(bookingUI.viewRoomDetailUI.firstReserveBtn).toBeVisible();
        await bookingUI.viewRoomDetailUI.firstReserveBtn.click();
        await bookingUI.bookingFormUI.firstNameInput.fill(firstName);
        await bookingUI.bookingFormUI.lastNameInput.fill(lastName);
      });

      await test.step("Click Cancel button", async () => {
        await expect(bookingUI.bookingFormUI.cancelBtn).toBeVisible();
        await bookingUI.bookingFormUI.cancelBtn.click();
      });

      await test.step("Check submit form is closed", async () => {
        /**kiểm tra sau khi bấm Cancel, UI hiển thị heading 'Book this room'
         * calendar chọn ngày được hiển thị lại
         */
        await expect(
          bookingUI.viewRoomDetailUI.bookThisRoomHeading,
        ).toBeVisible();
        await expect(bookingUI.viewRoomDetailUI.bookingCalendar).toBeVisible();
      });
    },
  );
});
