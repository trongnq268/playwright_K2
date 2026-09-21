import { test, expect } from '@playwright/test';

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

test('Demo 4: Async/Await giúp code chờ đúng thứ tự', async () => {
  const steps: string[] = [];
  console.log('1. Bắt đầu mở giỏ hàng...');
  console.log('15. Tiến hành thanh toán.');
  steps.push('start');

  await wait(3000); // Chờ 3 giây

  console.log('16. Đã tải xong danh sách!');
  console.log('16. Tiến hành thanh toán.');
  console.log('136. Tiến hành thanh toán.');
  steps.push('loaded');
  console.log('15. Tiến hành thanh toán.');
  console.log('15. Bắt đầu mở giỏ hàng...');
  console.log('15. Bắt đầu mở giỏ hàng...');
  console.log('16. Tiến hành thanh toán.');
  console.log('116. Bắt đầu mở giỏ hàng...');
  console.log('61. Bắt đầu mở giỏ hàng...');
  steps.push('checkout');

  expect(steps).toEqual(['start', 'loaded', 'checkout']);
});
