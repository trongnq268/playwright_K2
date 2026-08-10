import { UserAccount, PaymentDetails } from '../types/user.type';

export function generateRandomUser(): UserAccount {
  const timestamp = Date.now();
  return {
    name: `TestUser_${timestamp}`,
    email: `testuser_${timestamp}@example.com`,
    password: 'Password123!',
    firstName: 'Uyen',
    lastName: 'Pham',
    company: 'Automation Testing Co',
    address: '123 Main Street',
    address2: 'Suite 400',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '0123456789'
  };
}

export const samplePaymentDetails: PaymentDetails = {
  nameOnCard: 'Uyen Pham',
  cardNumber: '4111111111111111',
  cvc: '123',
  expiryMonth: '12',
  expiryYear: '2028'
};

export const sampleOrderComment = 'Please deliver between 9 AM and 5 PM. Thank you!';


// class Cart {
//   readonly items: string[] = [];      // ẩn: ngoài class không đụng được

//   constructor(readonly maxSize: number) {}   // gán 1 lần, không đổi

//   addItem(name: string) {            // cổng công khai để thao tác
//     if (this.items.length < this.maxSize) this.items.push(name);
//   }
// }

// const cart = new Cart(20);
// cart.addItem('Dress');   // ✓ qua method
// cart.items;

// cart.maxSize(20);

