import { test, expect } from "@playwright/test";
import { ContactSection } from "../../pages/contact.section";
import {
  EMPTY_CONTACT_DATA,
  VALID_CONTACT_DATA,
} from "../../data/contactFormData";
import { ContactFormModel } from "../../models/ContactFormModel.class";

test.describe("Contact Form tests", () => {
  let contact: ContactSection;

  test.beforeEach("Open web", async ({ page }) => {
    contact = new ContactSection(page);
    await test.step("open website", async () => {
      await contact.goto();
    });
  });

  test("TC01: submit contact form succesfully", async () => {
    await test.step("Fill in contact form", async () => {
      await contact.fillForm(VALID_CONTACT_DATA);
      await contact.submit();
    });

    await test.step("Verify correct name is submitted", async () => {
      const expectedHeading = await contact.getSuccessMessage();
      expect(expectedHeading).toContain(VALID_CONTACT_DATA.getName);
    });
  });

  test("TC02: validation when contact form inputs are empty", async () => {
    await test.step("Submit empty contact form", async () => {
      await contact.submit();
    });

    await test.step("Verify correct error is showed after submitting empty contact form", async () => {
      const contactModel = EMPTY_CONTACT_DATA;

      const expectedErrors = contactModel.validate().errors; 
      const actualErrors = await contact.getErrorMessages();
      expect(actualErrors).toEqual(expectedErrors.toSorted());
    });
  });
});
