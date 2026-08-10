import { UserSignupInfo } from '../types/user.interface';
import { PaymentInfo } from '../types/payment.interface';

/**
 * Gom nhóm các hàm và dữ liệu trong userData.ts
 * @deprecated Import getTestUser, defaultPaymentData, defaultOrderComment trực tiếp từ userData.ts
 */
export const getUserDataInfor = () => ({
  getTestUser,
  defaultPaymentData,
  defaultOrderComment,
});

/**
 * Hàm khởi tạo dữ liệu người dùng mới với email và username duy nhất.
 */
export const getTestUser = (prefix: string = 'User'): UserSignupInfo => {
  const timestamp = Date.now();
  return {
    name: `${prefix}_${timestamp}`,
    email: `${prefix.toLowerCase()}_${timestamp}@example.com`,
    title: 'Mr',
    password: 'Password123!',
    day: '15',
    month: '5',
    year: '1995',
    newsletter: true,
    specialOffers: true,
    firstName: 'John',
    lastName: 'Doe',
    company: 'TestCorp',
    address1: '123 Test Street',
    address2: 'Apt 4B',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '1234567890',
  };
};

/**
 * Dữ liệu thanh toán thẻ ngân hàng mặc định.
 */
export const defaultPaymentData: PaymentInfo = {
  nameOnCard: 'John Doe',
  cardNumber: '4111111111111111',
  cvc: '123',
  expiryMonth: '12',
  expiryYear: '2028',
};

/**
 * Ghi chú đơn hàng mặc định khi checkout.
 */
export const defaultOrderComment = 'Vui lòng giao hàng vào giờ hành chính.';


