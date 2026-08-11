/**
 * Bài 1 - IContactForm: cấu trúc dữ liệu của form liên hệ.
 */
export interface IContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
}

/**
 * ContactFormModel đóng gói dữ liệu form liên hệ (encapsulation):
 * - Các thuộc tính là private, chỉ truy cập được qua getters.
 * - validate() kiểm tra dữ liệu hợp lệ trước khi submit.
 * - toPayload() chuyển thành Plain Object sẵn sàng gửi API / UI.
 */
export class ContactFormModel {
  private name: string;
  private email: string;
  private phone: string;
  private subject: string;
  private description: string;

  constructor(data: IContactForm) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.subject = data.subject;
    this.description = data.description;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  getSubject(): string {
    return this.subject;
  }

  getDescription(): string {
    return this.description;
  }

  /**
   * Kiểm tra tính hợp lệ dữ liệu theo các rule tương tự trang
   * automationintesting.online (có thể chỉnh lại cho khớp UI thật).
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.name || this.name.trim().length < 3) {
      errors.push('Name must be at least 3 characters.');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailPattern.test(this.email)) {
      errors.push('Email must be a valid email address.');
    }

    if (!this.phone || this.phone.trim().length < 11 || this.phone.trim().length > 21) {
      errors.push('Phone must be between 11 and 21 characters.');
    }

    if (!this.subject || this.subject.trim().length < 5 || this.subject.trim().length > 100) {
      errors.push('Subject must be between 5 and 100 characters.');
    }

    if (!this.description || this.description.trim().length < 20 || this.description.trim().length > 2000) {
      errors.push('Description must be between 20 and 2000 characters.');
    }

    return { isValid: errors.length === 0, errors };
  }

  /** Chuyển toàn bộ dữ liệu thành Plain Object, sẵn sàng cho request body / API. */
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
