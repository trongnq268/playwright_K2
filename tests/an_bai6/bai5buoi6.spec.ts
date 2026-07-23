import { test, expect } from '@playwright/test';


const wait = (ms: number): Promise<void> => {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
};
interface Khoa_hoc {
    id: string;
    ten: string;
    so_hoc_vien: number;
    gia: number;
    dang_mo: boolean;
}


const danh_sach_khoa_hoc: Khoa_hoc[] = [
    {
        id: 'C001',
        ten: 'QA manual',
        so_hoc_vien: 150,
        gia: 49.99,
        dang_mo: true
    },
    {
        id: 'C002',
        ten: 'QA automain',
        so_hoc_vien: 200,
        gia: 60,
        dang_mo: true
    },
    {
        id: 'C003',
        ten: 'QA AI',
        so_hoc_vien: 80,
        gia: 70,
        dang_mo: false
    },
    {
        id: 'C004',
        ten: 'Unity Dev',
        so_hoc_vien: 120,
        gia: 100,
        dang_mo: true
    },
    {
        id: 'C005',
        ten: 'game design',
        so_hoc_vien: 95,
        gia: 100,
        dang_mo: false
    },
    {
        id: 'C006',
        ten: 'dev front end',
        so_hoc_vien: 180,
        gia: 90,
        dang_mo: true
    },
    {
        id: 'C007',
        ten: 'QA automain',
        so_hoc_vien: 60,
        gia: 60,
        dang_mo: true
    }
];

const totalStudents = ():number => {
    let tong_so_hoc_sinh: number = 0;
    for (const tong_hoc_sinh of danh_sach_khoa_hoc){
        tong_so_hoc_sinh += tong_hoc_sinh.so_hoc_vien;
    }
    return tong_so_hoc_sinh;

}

const totalRevenue = ():number => {
    let tong_doanh_thu: number = 0;
    for (const khoa of danh_sach_khoa_hoc){
        
        tong_doanh_thu += khoa.gia * khoa.so_hoc_vien;
    }
    return tong_doanh_thu;
}

const most_popular = ():number => {
    let nhieu_hoc_vien: number = 0;
    for (const nhieu_nhat of danh_sach_khoa_hoc){
        if (nhieu_nhat.so_hoc_vien > nhieu_hoc_vien){
            nhieu_hoc_vien = nhieu_nhat.so_hoc_vien;
        }
    }
    return nhieu_hoc_vien;

}
const open = ():number => {
    let dang_mo :  number = 0;
    for (const mo of danh_sach_khoa_hoc){
        if (mo.dang_mo === true){
            dang_mo++;
        }
    }
    return dang_mo;
}



const show_cac_khoa_hoc = (): void => {
    for (const show of danh_sach_khoa_hoc){
        console.log(show.ten)
    }
}


test('bai_5_khoa_hoc', async () => {

console.log("dang tai cac khoa hoc......");
await wait (2000);
show_cac_khoa_hoc();

const check_doanh_thu = totalRevenue();
console.log(`doanh thu tat cac khoa hoc la ${check_doanh_thu}`);

const check_nhieu_hoc_vien_nhat = most_popular();
console.log(`khoa hoc nhieu hoc vien nhat la ${check_nhieu_hoc_vien_nhat}`);

const check_khoa_hoc_dang_mo = open();
console.log(`cac khoa hoc dang mo la ${check_khoa_hoc_dang_mo}`);


expect(check_doanh_thu).toBe(66398.5)

});


