import { test, expect } from '@playwright/test';

interface Order {
    id: string;
    customer: string;
    total: number;
    status: string;
}

const wait = (ms: number): Promise<void> => {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
};
test('bai_3', async () => {


const Don_hang = [
    {
    id: "001",
    customer: "A",
    total: 36000,
    status: "da thanh toan" 
   },
   {
    id: "002",
    customer: "B",
    total: 1000,
    status: "chua thanh toan" 
   },
   {
    id: "003",
    customer: "C",
    total: 6000,
    status: "da dat hang" 
   },
   {
    id: "004",
    customer: "D",
    total: 3700,
    status: "ship hang" 
   },
   {
    id: "005",
    customer: "E",
    total: 1000,
    status: "dang giao hang" 
   },
]
const load_order = async (): Promise<void> => {
    console.log("Đang tải danh sách đơn hàng...");
    await wait(20000);
    console.log('danh sach don hang :')
    console.log(Don_hang)
}

await load_order();

});