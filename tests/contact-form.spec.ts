import { test, expect } from '@playwright/test';
import { ContactSection, formData } from '../pages/contact.section';
import { ContactFormModel } from '../models/contact-form.model';

test.describe('Bài 4 - Contact Form', () => {
  let contactSection: ContactSection;

  test.beforeEach(async ({ page }) => {
    contactSection = new ContactSection(page);
    await contactSection.goto();
  });

  test('TC1: Submit thành công với dữ liệu hợp lệ', async () => {
    // const formData = new ContactFormModel({
    //   name: 'Nguyen Van A',
    //   email: 'nguyenvana@example.com',
    //   phone: '0987654321012',
    //   subject: 'Hoi ve tinh trang phong trong',
    //   description:
    //     'Toi muon hoi ve tinh trang phong trong trong thang toi, xin cam on nhieu.',
    // });
    const formData = formData;
    // dữ liệu hợp lệ trước khi thao tác UI
    expect(formData.validate().isValid).toBeTruthy();

    await contactSection.fillForm(formData);
    await contactSection.submit();

    const message = await contactSection.getSuccessMessage();
    expect(message).toContain(formData.getSubject());
  });

  test('TC2: Hiện lỗi validation khi submit form trống', async () => {
    await contactSection.submit();

    const errors = await contactSection.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });
});

