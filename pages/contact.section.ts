import { Locator, Page } from "@playwright/test";
import { ContactFormModel } from "../models/ContactFormModel.class";

export class ContactSection {
  constructor(private page: Page) {}

  get nameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Name" });
  }

  get emailInput(): Locator {
    return this.page.getByRole("textbox", { name: "Email" });
  }

  get phoneInput(): Locator {
    return this.page.getByRole("textbox", { name: "Phone" });
  }

  get subjectInput(): Locator {
    return this.page.getByRole("textbox", { name: "Subject" });
  }

  get descriptionInput(): Locator {
    return this.page.locator('[data-testid="ContactDescription"]');
  }

  get submitBtn(): Locator {
    return this.page.getByRole("button", { name: "Submit" });
  }

  get successHeader(): Locator {
    return this.page.getByRole("heading", {
      name: "Thanks for getting in touch",
    });
  }

  get errorAlerts(): Locator {
    return this.page.locator(".alert.alert-danger p");
  }

  async goto() {
    await this.page.goto("https://automationintesting.online/");
  }

  async fillForm(data: ContactFormModel) {
    await this.nameInput.fill(data.getName);
    await this.emailInput.fill(data.getEmail);
    await this.phoneInput.fill(data.getPhone);
    await this.subjectInput.fill(data.getSubject);
    await this.descriptionInput.fill(data.getDescription);
  }

  async submit() {
    await this.submitBtn.click();
  }

  async getSuccessMessage(): Promise<string> {
    const successMsg = await this.successHeader.innerText();
    return successMsg;
  }

  async getErrorMessages(): Promise<string[]> {
    let errMessages: string[] = [];
    await this.errorAlerts.first().waitFor({ state: "visible" });
    errMessages = await this.errorAlerts.allInnerTexts();
    return errMessages.toSorted();
  }
}
