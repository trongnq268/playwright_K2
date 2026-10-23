/**
 * Interface định nghĩa cấu trúc dữ liệu cho một ca kiểm thử Đăng nhập (Login).
 */
export interface LoginTestCase {
  testCaseId: string;
  description: string;
  email: string;
  password: string;
  expectedResult: 'success' | 'failure';
  expectedMessage?: string;
}
