import { test, expect } from '@playwright/test';

test('info', async () => {
    const sanPham: string = "iPhone 15";
    let gia: number = 1000;
    let soLuong: number = 2;
    let tongTien: number = gia*soLuong;
    //const ketqua:boolean =tongTien>1500; // Khong nen dung toan tu trong boolean
    let ketqua:boolean;
    console.log(tongTien);
    console.log(ketqua);
    console.log("Tong gia tien > 1500 ",tongTien > 1500);

    //soSanh = tongTien > 1500;
    //expect(soSanh).toBe(true);


});

test('bai tap 2', async () => {
    let LapTop: string = "Laptop";
    let Mouse: string = "Chuot";
    let giaLaptop: number = 1800;
    let giaMouse: number =50;
    let totalLaptop: number = giaLaptop*2;
    let totalMouse: number = giaMouse*3;
    let tongHoaDon:number = totalLaptop +totalMouse;
    let soTien1thang: number = tongHoaDon / 12;
    console.log("Tong so tien mua Laptop la: ",totalLaptop);
    console.log("Tong so tien mua Chuot la: ",totalMouse);
    console.log("Tong hoa don la: ", tongHoaDon);
    console.log("So tien phai tra 1 thang la: ",soTien1thang);




});