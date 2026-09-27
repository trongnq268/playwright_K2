export class Helper {
  /**
   * Sinh chuỗi ngẫu nhiên với độ dài tuỳ chọn
   * @param length Độ dài chuỗi cần tạo
   */
  static generateRandomString(length: number = 8): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  /**
   * Sinh mật khẩu ngẫu nhiên không chính xác (cho TC02 Login Fail)
   * @param prefix Tiền tố mật khẩu
   */
  static generateRandomPassword(prefix: string = 'WrongPass_'): string {
    return `${prefix}${this.generateRandomString(8)}`;
  }

  /**
   * Sinh username ngẫu nhiên hợp lệ cho OrangeHRM (độ dài >= 5 ký tự)
   * @param prefix Tiền tố username
   */
  static generateRandomUsername(prefix: string = 'emp_'): string {
    return `${prefix}${Date.now().toString(36)}_${this.generateRandomString(4)}`;
  }

  /**
   * Sinh Employee ID ngẫu nhiên không trùng lặp (chuỗi số 5-6 chữ số)
   */
  static generateRandomEmployeeId(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Sinh mật khẩu mạnh thỏa mãn yêu cầu của OrangeHRM:
   * Tối thiểu 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt
   */
  static generateStrongPassword(): string {
    return `P@ss${this.generateRandomString(5)}123!`;
  }
}
