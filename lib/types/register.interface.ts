/**
 * Interface định nghĩa cấu trúc dữ liệu cho một ca kiểm thử Đăng ký tài khoản (Register).
 */
export interface RegisterTestCase {
  testCaseId: string;
  description: string;
  name: string;
  email: string;
  title?: string;
  password?: string;
  day?: string;
  month?: string;
  year?: string;
  newsletter?: boolean | string;
  specialOffers?: boolean | string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  country?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  mobileNumber?: string;
  expectedResult: 'success' | 'failure';
  expectedMessage?: string;
}
