import { test, expect } from '@playwright/test';



interface Product {
    name: string;
    price: number;
    quantity: number;
}

const product: Product[] = [
    {
        name: 'ao phong',
        price: 100,
        quantity: 5
    },
    {
        name: 'ao khoac',
        price: 120,
        quantity: 2
    },
    {
        name: 'ao so mi',
        price: 130,
        quantity: 1
    },
    {
        name: 'ao the thao',
        price: 90,
        quantity: 2
    },
    {
        name: 'quan bo',
        price: 150,
        quantity: 2
    },
    {
        name: 'quan au',
        price: 140,
        quantity: 1
    },
];


const calculateTotal = (): number => {
    let tong_gia_tien = 0;
    for (const p of product) {
        tong_gia_tien += p.price * p.quantity;
    }
    return tong_gia_tien;
}
const applyDiscount = (total: number): number => {
    if (total >= 3000) {
        return total * 0.8;
    } else if (total >= 2000) {
        return total * 0.85;
    } else if (total >= 1000) {
        return total * 0.9;
    } else {
        return total;
    }

}
const print = (): void =>{
    for(const in_hoa_don of product){
        console.log(`${in_hoa_don.name} x ${in_hoa_don.quantity} = ${(in_hoa_don.price)*(in_hoa_don.quantity)}`)
    }
}







test('bai_4', async () => {
 
const check_so_luong_san_pham = calculateTotal();
console.log(`tong so tien tam tinh ${check_so_luong_san_pham}`);



const check_giam_giam_gia = applyDiscount(check_so_luong_san_pham);
let so_tien_da_duoc_giam_gia = check_so_luong_san_pham - check_giam_giam_gia;
console.log(`giam gia ${so_tien_da_duoc_giam_gia}`)
console.log(`so tien sau khi giam gia ${check_giam_giam_gia}`);


print();


});