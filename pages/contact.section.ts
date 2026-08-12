import { Page, Locator } from '@playwright/test';
import { ContactFormModel } from '../models/contact-form.model';

/**
 * Bài 2 - Page Class cho khu vực Form Liên hệ trên trang chủ.
 * NOTE: các selector (#name, #email, ...) được lấy theo cấu trúc phổ biến
 * của restful-booker-platform. Nếu DOM thực tế khác, chỉ cần chỉnh trong
 * các getter bên dưới — phần fillForm/submit/assert ở test không cần đổi.
 */

  export const formData = new ContactFormModel({
      name: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      phone: '0987654321012',
      subject: 'Hoi ve tinh trang phong trong',
      description:
        'Toi muon hoi ve tinh trang phong trong trong thang toi, xin cam on nhieu.',
    });
export class ContactSection {
  constructor(private page: Page) {}

  get nameInput(): Locator {
    return this.page.locator('#name');
  }

  get emailInput(): Locator {
    return this.page.locator('#email');
  }

  get phoneInput(): Locator {
    return this.page.locator('#phone');
  }

  get subjectInput(): Locator {
    return this.page.locator('#subject');
  }

  get descriptionInput(): Locator {
    return this.page.locator('#description');
  }

  get submitBtn(): Locator {
    return this.page.getByRole('button', { name: 'Submit' });

  }

  get successHeader(): Locator {
    return this.page.locator(`p:has-text("${formData.getSubject()}")`);
  }

  get errorAlerts(): Locator {
    return this.page.locator('.alert.alert-danger');


  }

  async goto(): Promise<void> {
    await this.page.goto('https://automationintesting.online/');
  }

  async fillForm(data: ContactFormModel): Promise<void> {
    await this.nameInput.fill(data.getName());
    await this.emailInput.fill(data.getEmail());
    await this.phoneInput.fill(data.getPhone());
    await this.subjectInput.fill(data.getSubject());
    await this.descriptionInput.fill(data.getDescription());
  }

  async submit(): Promise<void> {
    await this.submitBtn.click();
  }

  async getSuccessMessage(): Promise<string> {
    return (await this.successHeader.textContent()) ?? '';
  }

  async getErrorMessages(): Promise<string[]> {
    return await this.errorAlerts.allTextContents();
  }
}
