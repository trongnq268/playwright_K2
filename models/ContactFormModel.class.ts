export class ContactFormModel {
  private name: string;
  private email: string;
  private phone: string;
  private subject: string;
  private description: string;

  constructor(
    name: string,
    email: string,
    phone: string,
    subject: string,
    description: string,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.subject = subject;
    this.description = description;
  }

  get getName(): string {
    return this.name;
  }

  get getEmail(): string {
    return this.email;
  }

  get getPhone(): string {
    return this.phone;
  }

  get getSubject(): string {
    return this.subject;
  }
  get getDescription(): string {
    return this.description;
  }

  validate(): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (this.name === "") {
      errors.push("Name may not be blank");
    }

    if (this.email === "") {
      errors.push("Email may not be blank");
    }

    if (this.phone === "") {
      errors.push("Phone must be between 11 and 21 characters.");
      errors.push("Phone may not be blank");
    }
    
    if (this.subject === "") {
      errors.push("Subject may not be blank");
      errors.push("Subject must be between 5 and 100 characters.");
    }

    if (this.description === "") {
      errors.push("Message may not be blank");
      errors.push("Message must be between 20 and 2000 characters.");
    }
    return { isValid: errors.length === 0, errors };
  }

  toPayload(): object {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      subject: this.subject,
      description: this.description,
    };
  }
}
