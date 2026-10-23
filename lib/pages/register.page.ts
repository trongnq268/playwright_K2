import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { RegisterTestCase } from '../types/register.interface';

/**
 * Lớp RegisterPage quản lý toàn bộ quy trình đăng ký tài khoản gồm:
 * Bước 1 (Đăng ký sơ bộ tại /login) và Bước 2 (Thông tin tài khoản & Địa chỉ tại /signup).
 */
export class RegisterPage extends BasePage {
  // Bộ định vị cho biểu mẫu đăng ký sơ bộ Bước 1 (/login)
  get signupForm(): Locator { return this.page.locator('.signup-form'); }
  get signupNameInput(): Locator { return this.signupForm.locator('input[data-qa="signup-name"]'); }
  get signupEmailInput(): Locator { return this.signupForm.locator('input[data-qa="signup-email"]'); }
  get signupButton(): Locator { return this.signupForm.locator('button[data-qa="signup-button"]'); }
  get signupErrorMessage(): Locator { return this.signupForm.locator('p'); }

  // Bộ định vị cho biểu mẫu thông tin tài khoản & địa chỉ Bước 2 (/signup)
  get titleMrRadio(): Locator { return this.page.locator('#id_gender1'); }
  get titleMrsRadio(): Locator { return this.page.locator('#id_gender2'); }
  get passwordInput(): Locator { return this.page.locator('input[data-qa="password"]'); }
  get daysSelect(): Locator { return this.page.locator('select[data-qa="days"]'); }
  get monthsSelect(): Locator { return this.page.locator('select[data-qa="months"]'); }
  get yearsSelect(): Locator { return this.page.locator('select[data-qa="years"]'); }
  get newsletterCheckbox(): Locator { return this.page.locator('input[name="newsletter"]'); }
  get specialOffersCheckbox(): Locator { return this.page.locator('input[name="optin"]'); }
  get firstNameInput(): Locator { return this.page.locator('input[data-qa="first_name"]'); }
  get lastNameInput(): Locator { return this.page.locator('input[data-qa="last_name"]'); }
  get companyInput(): Locator { return this.page.locator('input[data-qa="company"]'); }
  get address1Input(): Locator { return this.page.locator('input[data-qa="address"]'); }
  get address2Input(): Locator { return this.page.locator('input[data-qa="address2"]'); }
  get countrySelect(): Locator { return this.page.locator('select[data-qa="country"]'); }
  get stateInput(): Locator { return this.page.locator('input[data-qa="state"]'); }
  get cityInput(): Locator { return this.page.locator('input[data-qa="city"]'); }
  get zipcodeInput(): Locator { return this.page.locator('input[data-qa="zipcode"]'); }
  get mobileNumberInput(): Locator { return this.page.locator('input[data-qa="mobile_number"]'); }
  get createAccountButton(): Locator { return this.page.locator('button[data-qa="create-account"], button[data-qa="create-account-button"]'); }
  get accountCreatedHeading(): Locator { return this.page.locator('h2[data-qa="account-created"]'); }

  constructor(page: Page) {
    super(page);
  }

  /**
   * Điều hướng tới trang đăng ký/đăng nhập (/login).
   */
  async goto(): Promise<void> {
    await this.navigate('/login');
  }

  /**
   * Điền thông tin đăng ký sơ bộ (Tên và Email) và nhấp chọn nút Signup.
   * @param name Tên người dùng
   * @param email Email người dùng
   */
  async fillSignupInitial(name: string, email: string): Promise<void> {
    await this.fillField(this.signupNameInput, name);
    await this.fillField(this.signupEmailInput, email);
    await this.clickElement(this.signupButton);
  }

  /**
   * Điền thông tin tài khoản (Danh xưng, Mật khẩu, Ngày/Tháng/Năm sinh, Hộp kiểm bản tin, Ưu đãi).
   * @param accountData Dữ liệu thông tin tài khoản
   */
  async fillAccountInfo(accountData: Partial<RegisterTestCase>): Promise<void> {
    if (accountData.title) {
      const radio = accountData.title.toLowerCase() === 'mrs' ? this.titleMrsRadio : this.titleMrRadio;
      await this.checkCheckbox(radio);
    }

    if (accountData.password !== undefined) {
      await this.fillField(this.passwordInput, accountData.password);
    }

    if (accountData.day) await this.selectOption(this.daysSelect, String(accountData.day));
    if (accountData.month) await this.selectOption(this.monthsSelect, String(accountData.month));
    if (accountData.year) await this.selectOption(this.yearsSelect, String(accountData.year));

    if (accountData.newsletter !== undefined && accountData.newsletter !== '') {
      const isNewsletter = String(accountData.newsletter).toLowerCase() === 'true';
      isNewsletter ? await this.checkCheckbox(this.newsletterCheckbox) : await this.uncheckCheckbox(this.newsletterCheckbox);
    }

    if (accountData.specialOffers !== undefined && accountData.specialOffers !== '') {
      const isOffers = String(accountData.specialOffers).toLowerCase() === 'true';
      isOffers ? await this.checkCheckbox(this.specialOffersCheckbox) : await this.uncheckCheckbox(this.specialOffersCheckbox);
    }
  }

  /**
   * Điền thông tin địa chỉ và nhấn nút Tạo tài khoản (Create Account).
   * @param addressData Dữ liệu địa chỉ người dùng
   */
  async fillAddressInfo(addressData: Partial<RegisterTestCase>): Promise<void> {
    const textFields: [Locator, string | undefined][] = [
      [this.firstNameInput, addressData.firstName],
      [this.lastNameInput, addressData.lastName],
      [this.companyInput, addressData.company],
      [this.address1Input, addressData.address1],
      [this.address2Input, addressData.address2],
      [this.stateInput, addressData.state],
      [this.cityInput, addressData.city],
      [this.zipcodeInput, addressData.zipcode],
      [this.mobileNumberInput, addressData.mobileNumber],
    ];

    for (const [locator, value] of textFields) {
      if (value !== undefined) {
        await this.fillField(locator, value);
      }
    }

    if (addressData.country) {
      await this.selectOption(this.countrySelect, addressData.country);
    }

    await this.clickElement(this.createAccountButton);
  }

  /**
   * Quy trình đăng ký hoàn chỉnh từ Bước 1 đến khi nhấn Create Account.
   * @param data Dữ liệu ca kiểm thử đăng ký đầy đủ
   */
  async register(data: RegisterTestCase): Promise<void> {
    await this.fillSignupInitial(data.name, data.email);

    // Nếu bước 1 thành công (chuyển tiếp sang /signup), tiếp tục điền Bước 2
    try {
      // Dùng Promise.race để bắt sớm lỗi trùng email hoặc sang bước 2 thay vì chờ cứng timeout
      const stepResult = await Promise.race([
        this.passwordInput.waitFor({ state: 'visible', timeout: 4000 }).then(() => 'proceed'),
        this.signupErrorMessage.waitFor({ state: 'visible', timeout: 4000 }).then(() => 'error'),
      ]);

      if (stepResult === 'proceed') {
        await this.fillAccountInfo(data);
        await this.fillAddressInfo(data);
      }
    } catch {
      // Trường hợp xác thực HTML5 chặn submit phía client hoặc hết timeout
    }
  }

  /**
   * Lấy thông báo lỗi hiển thị trên biểu mẫu đăng ký.
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isElementVisible(this.signupErrorMessage)) {
      return await this.getElementText(this.signupErrorMessage);
    }
    const nameValidation = await this.signupNameInput.evaluate((el: HTMLInputElement) => el.validationMessage).catch(() => '');
    if (nameValidation) return nameValidation;

    const emailValidation = await this.signupEmailInput.evaluate((el: HTMLInputElement) => el.validationMessage).catch(() => '');
    if (emailValidation) return emailValidation;

    return '';
  }

  /**
   * Lấy nội dung văn bản tiêu đề của trang Thông báo tạo tài khoản thành công.
   */
  async getSuccessHeading(): Promise<string> {
    return await this.getElementText(this.accountCreatedHeading);
  }

  /**
   * Kiểm tra tiêu đề Tạo tài khoản thành công có đang hiển thị hay không.
   */
  async isSuccessHeadingVisible(): Promise<boolean> {
    return await this.isElementVisible(this.accountCreatedHeading);
  }
}
