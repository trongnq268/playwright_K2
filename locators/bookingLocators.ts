import { Page, Locator } from "@playwright/test";

export class BookingLocators {
  readonly page: Page;

  // Nút Book now được chia cụ thể cho 3 loại phòng
  // const singleRoomBookBtn: Locator;
  readonly singleRoomBookBtn: Locator;
  readonly doubleRoomBookBtn: Locator;
  readonly suiteRoomBookBtn: Locator;

  // Form Đặt Phòng
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly reserveBtn: Locator;
  readonly cancelBtn: Locator;

  // Thành phần thông báo
  readonly successModal: Locator;
  readonly returnHomeBtn: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    this.singleRoomBookBtn = page
      .locator("div")
      .filter({ has: page.getByRole("heading", { name: "Single", level: 5 }) })
      .getByRole("link", { name: "Book now" })
      .first();

    this.doubleRoomBookBtn = page
      .locator("div")
      .filter({ has: page.getByRole("heading", { name: "Double" }) })
      .getByRole("button", { name: "Book now" })
      .first();

    this.suiteRoomBookBtn = page
      .locator("div")
      .filter({ has: page.getByRole("heading", { name: "Suite" }) })
      .getByRole("button", { name: "Book now" })
      .first();
    // Locators cho các field trong form
    this.firstNameInput = page.locator('input[name="firstname"]');
    this.lastNameInput = page.locator('input[name="lastname"]');
    this.emailInput = page.locator('input[name="email"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.reserveBtn = page.getByRole("button", { name: "Reserve Now" });
    this.cancelBtn = page.getByRole("button", { name: "Cancel" });

    // Locators cho kết quả
    this.successModal = page.getByText("Booking Confirmed");
    this.returnHomeBtn = page.getByRole("button", { name: "Close" });
    this.errorAlert = page.locator(".alert-danger");
  }
}
