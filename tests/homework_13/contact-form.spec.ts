import { test, expect } from '@playwright/test';
import {ContactFormModel} from '../../pages/homwork13_page/contactFormModal.page';
import {ContactSection} from '../../pages/homwork13_page/contact.section';

test.describe('Bài 4: Viết Test Script cho Form Liên hệ (contact-form.spec.ts)', () =>{
    
    let contactSection: ContactSection;
    let contactFormModel: ContactFormModel;

    test.beforeEach('Khởi tạo instance và mở page', async({ page }) =>{
        contactSection = new ContactSection(page);
        await page.goto('https://automationintesting.online/');
    });
    
    test('Test case 1: Submit thành công', async() =>{
        contactFormModel = new ContactFormModel(
            'Nhung',
            'nhungnh@gmail.com',
            '098765432111',
            'subjection',
            'This is a valid description for testing purpose'
        );
        await contactSection.fillForm(contactFormModel);
        await contactSection.submit();

        const successMessage = await contactSection.getSuccessMessage();
        expect(successMessage).toContain(contactFormModel.getName());
    });

    test('Test Case 2 (Validation lỗi khi gửi form trống)', async() =>{
        await contactSection.submit();

        const errorMessage = await contactSection.getErrorMessages();
        expect(errorMessage.length).toBeGreaterThan(0);
    });
});