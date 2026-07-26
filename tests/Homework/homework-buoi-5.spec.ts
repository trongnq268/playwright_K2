import { test, expect } from '@playwright/test';

// Bai 1: Tinh tong hoa don
test('Bai 1', async () => {
const calculateTotal = (price : number, quantity: number): number =>{
    return price * quantity;
};
const productA = calculateTotal(15000, 2);
const productB = calculateTotal(30000, 2);
const productC = calculateTotal(15000, 3);
const productD= calculateTotal(20000, 3);
const productE = calculateTotal(15000, 4);
console.log(`Thanh tien san pham A = ${productA}`);
console.log(`Thanh tien san pham B = ${productB}`);
console.log(`Thanh tien san pham C = ${productC}`);
console.log(`Thanh tien san pham D = ${productD}`);
console.log(`Thanh tien san pham E = ${productE}`);
});

// Bai 2: Quan ly danh sach testcase
test('Bai 2', async () => {
    const status: string[]=["Login","Logout","SignUp"];
    const runTest = (name : string): string =>{
        return `Running test: ${name}`;
    };
    const results: string[]=[];
    for (const test of status){
        const result = runTest(test);
        console.log(result);
        results.push(result);
    }
    expect(results).toEqual(["Running test: Login","Running test: Logout","Running test: SignUp"]);

});

// Bai 3: Tinh luong nhan vien
test('Bai 3', async () => {
    // Viết function calculateSalary(salaryPerHour:number, workingHours:number):number
    const calculateSalary = (salaryPerHour:number, workingHours:number):number =>{
        const totalSalary = salaryPerHour * workingHours;
        return totalSalary;
    };
    //Tạo dữ liệu cho 4 nhân viên + Tính lương từng người bằng function
    const nhanVienA = calculateSalary(15000, 20);
    const nhanVienB = calculateSalary(20000, 25);
    const nhanVienC = calculateSalary(25000, 20);
    const nhanVienD= calculateSalary(25000, 23);
    //Dùng vòng lặp for để in lương => Đoạn này nhờ thầy giúp em với ạ
    console.log(`Luong cua nhan vien A la ${nhanVienA}`);
    console.log(`Luong cua nhan vien B la ${nhanVienB}`);
    console.log(`Luong cua nhan vien C la ${nhanVienC}`);
    console.log(`Luong cua nhan vien D la ${nhanVienD}`);
    
    //Dùng vòng lặp for kết hợp if để tìm nhân viên có lương cao nhất.
    const luongNhanVien : number[]=[nhanVienA, nhanVienB, nhanVienC, nhanVienD];
    let maxSalary = nhanVienA;
    for (const luong of luongNhanVien){
            if(nhanVienB > maxSalary){
            maxSalary = nhanVienB;
        }
        if(nhanVienC > maxSalary){
            maxSalary = nhanVienC;
        }
        if(nhanVienD > maxSalary){
            maxSalary = nhanVienD;
        }
    }
     console.log(`Nhan vien co luong cao nhat la ${maxSalary}`);

});

// Bai 4: Quan ly diem hoc sinh
test('Bai 4', async () => {
const students = [
    {
        id: "S01",
        name: "A",
        scores: [8.5, 6, 9, 5]
    },
    {
        id: "S02",
        name: "B",
        scores: [8.5, 7, 9, 8]
    },
    {
        id: "S03",
        name: "C",
        scores: [7, 8 , 9, 10]
    }
];
const calculateAverage = (scores: number[]): number =>{
let sum = 0;
for (let i = 0; i< scores.length; i++){
    sum = sum + scores[i];
}
return sum / scores.length;
    };

let highestAverage = 0;
let topStudent = students[0];
for (let i = 0; i < students.length; i++){
    const scoreAvg = calculateAverage(students[i].scores);
    console.log(`Diem trung binh cua ${students[i].name} la ${scoreAvg}`);
    if(scoreAvg > highestAverage){
    highestAverage = scoreAvg;
    topStudent = students[i];
    };
};
console.log(`Hoc sinh ${topStudent.name} co diem trung binh cao nhat = ${highestAverage}`);
});


// Bai 5: Quan ly diem hoc sinh don hang
test('Bai 5', async () => {
const donHang =[
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
const calculateAmount = (price:number, quantity:number):number =>{
    return price * quantity;
}
let tongDoanhThu = 0;
let maxTotal = 0;
let maxDonHang = donHang[0];
for(let i = 0; i < donHang.length; i++){
    let total = calculateAmount(donHang[i].price, donHang[i].quantity);
    console.log(`Thanh tien cua don hang ${donHang[i].orderId} = ${total}`);
    tongDoanhThu = tongDoanhThu + total;
    if(total > maxTotal){
        maxTotal = total;
        maxDonHang = donHang[i];
    };
};
console.log(`Tong doanh thu = ${tongDoanhThu}`);
console.log(`Don hang co gia tri lon nhat la: ${maxDonHang.orderId} = ${maxTotal}`);





});

