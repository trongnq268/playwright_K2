import { test, expect } from '@playwright/test';
// Coi interface laf kieeur duwx lieu mowis
interface Product{  
    name: string; // neeus khoong chuwa daau ?: => laf truowngf required
    price: number;
    quantity: number;
    fee ?: number; // ?: optional
}

// async: thuwjc hieej dodofng thoif cacs ddieeuf kieejn neeus thoar manx

test('has title', async () => { 
const products: Product[]=[
    {name: "Laptop",  price: 200, quantity: 1, fee: 20000},
    {name: "Mouse",  price: 200, quantity: 2},
];
expect(products[0].name).toBe('Laptop');
expect(products[1].price).toBe(200);

    
});

const wait = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds); // Báo hoàn thành sau milliseconds
  });
};
test('has title 2', async () => { 
// Hàm wait nhận vào mili-giây, trả về một Promise
const main = async () => {
  console.log('1. Bắt đầu');
  
  // Đợi 3 giây xong mới chạy tiếp dòng dưới
  await wait(3000); 
  
  console.log('2. Đã tải xong dữ liệu');
};
await main()
    
});