import { test, expect } from '@playwright/test';

test('fuction', async () => {
    const calculateSalary = (workingHours : number, salaryHours: number): number => {
        const totalSalary = workingHours * salaryHours;
        return totalSalary;
    };
    const memberA = calculateSalary(100, 51);
    const memberB = calculateSalary(100, 52);
    const memberC = calculateSalary(100, 53);
    console.log(`Luong cua member A la ${memberA}`);
    console.log(`Luong cua member B la ${memberB}`);
    console.log(`Luong cua member C la ${memberC}`);
    let maxSalary = memberC;
    if(memberB > maxSalary){
        maxSalary = memberB;
        console.log("Member B co luong cao nhat");
    }else if (memberA > maxSalary){
        maxSalary = memberC;
        console.log("Member A co luong cao nhat");
    }else{
        console.log("Member C co luong cao nhat");
    }
});

test('array', async () => {
    const products: string[] =["Apple", "Banana","Cherry"];
    console.log(products[0]);
    expect(products[0]).toBe("Apple");
    products.push("Straw berry");  // Them gia tri moi vafo cuoi array
    console.log(products[3]);
    for (const abc of products){
        console.log("vong lap");
        console.log(abc);
    }
});

test('Bai 5', async () => {

    const donHang = [
        {
            orderId: "A01",
            price: 1500,
            quantity: 2
        },
        {
            orderId: "A02",
            price: 3000,
            quantity: 3
        },
        {
            orderId: "A03",
            price: 5000,
            quantity: 2
        }
    ];

    const calculateAmount = (price: number, quantity: number): number => {
        return price * quantity;
    };

    let revenue = 0;
    let maxAmount = 0;
    let maxOrder = donHang[0];

    for (let i = 0; i < donHang.length; i++) {

        const amount = calculateAmount(
            donHang[i].price,
            donHang[i].quantity
        );

        console.log(
            `Thành tiền của đơn ${donHang[i].orderId} = ${amount}`
        );

        revenue += amount;

        if (amount > maxAmount) {
            maxAmount = amount;
            maxOrder = donHang[i];
        }
    }

    console.log(`Tổng doanh thu = ${revenue}`);
    console.log(
        `Đơn hàng có giá trị lớn nhất: ${maxOrder.orderId} = ${maxAmount}`
    );

});

