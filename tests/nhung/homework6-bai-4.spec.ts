import {test, expect} from '@playwright/test';

interface Product {
    name: string;
    price: number;
    quantity: number;
}

test('Bài 4 - Quản lý sản phẩm (Khó hơn Exam)', async()=>{
    // Tạo 6 sản phẩm
    const productList: Product[] = [
        {   name: 'Iphone', price: 950, quantity: 4 },
        {   name: 'Macbook pro', price: 430, quantity: 2 },
        {   name: 'Ipad', price: 180, quantity: 5 },
        {   name: 'Airpods', price: 470, quantity: 6 },
        {   name: 'Mouse', price: 143, quantity: 3 },
        {   name: 'Keyboard', price: 80, quantity: 1 }
    ]
    // wait
    const wait = (ms: number): Promise<void> =>{
        return new Promise((resolve) =>{
            setTimeout(resolve, ms);
        });
    }
    // Hàm tính tổng tiền
    const calculateTotal = (list: Product[]): number =>{
        let total: number = 0;
        for (const item of list) total += item.price * item.quantity;
        return total;
    }
    // Hàm tính tổng tiền sau giảm giá
    const applyDiscount = (list: Product[]): number =>{
        let totalAfterDiscount = 0;
        if( calculateTotal(productList) >= 3000) {
            totalAfterDiscount = calculateTotal(productList) * 0.8;
        }
        else if (calculateTotal(productList) >= 2000){
            totalAfterDiscount = calculateTotal(productList) * 0.85;
        }
        else if (calculateTotal(productList) >= 1000){
            totalAfterDiscount = calculateTotal(productList) * 0.9;
        }
        else totalAfterDiscount = calculateTotal(productList);

        return totalAfterDiscount;
    }
    // Hàm in hoá đơn
    const printInvoice = (list: Product[]): void => {
        for( const item of list){
            console.log(`${item.name} x${item.quantity} = ${item.quantity * item.price}`);
        }
    }

    // console.log(calculateTotal(productList));

    const main = async(): Promise<number> =>{
        console.log(`Đang tính tổng tiền....`);
        await wait(2000);
        console.log(`Tổng tiền: ${calculateTotal(productList)}`);
        console.log(`Tổng tiền sau giảm giá: ${applyDiscount(productList)}`);
        console.log(`--------------`);
        console.log('In hoá đơn');
        console.log(`${printInvoice(productList)}`);
        console.log(`--------------`);
        console.log(`Subtotal: ${calculateTotal(productList)}`);
        let amountDiscount = calculateTotal(productList) - applyDiscount(productList);
        console.log(`Discount: ${amountDiscount}`);
        console.log(`Final: ${applyDiscount(productList)}`);
        return applyDiscount(productList);
    }
    const result = await main();
    console.log(result);
    expect(result).toBeCloseTo(7111.2, 2);

});