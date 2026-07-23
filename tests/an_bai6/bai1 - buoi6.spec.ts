import { test, expect } from '@playwright/test';

interface Employee {
    id: string;
    name: string;
    age: number;
    salary: number;
    department: string;
}




test('bai_1-buoi6', async () => {

const danh_sach : Employee [] = [
    {
        id: '1',
        name: 'A',
        age: 30,
        salary: 50000,
        department: 'Engineering'
    },
    {
        id: '2',
        name: 'B',
        age: 23,
        salary: 9000,
        department: 'QA'
    },
    {
        id: '3',
        name: 'C',
        age: 27,
        salary: 50000,
        department: 'desgin'
    },
    {
        id: '4',
        name: 'D',
        age: 31,
        salary: 90000,
        department: 'QA'
    },
    {
        id: '5',
        name: 'E',
        age: 20,
        salary: 2000,
        department: 'QA'
    },
    {
        id: '6',
        name: 'F',
        age: 31,
        salary: 80000,
        department: 'Engineering'
    },
]




const check_max_salary = (): { ten_nguoi_co_luong_cao_nhat: string; maxsalary: number } => {
    let maxsalaryLocal: number = 0;
    let nguoi_co_luong_cao_nhat : string = '';
    for (const employee of danh_sach) {
        if (employee.salary > maxsalaryLocal) {
            maxsalaryLocal = employee.salary;
            nguoi_co_luong_cao_nhat = employee.name;
        }
    }
       return { ten_nguoi_co_luong_cao_nhat: nguoi_co_luong_cao_nhat, maxsalary: maxsalaryLocal };

}

const result = check_max_salary();
console.log(`nguoi co luong cao nhat la ${result.ten_nguoi_co_luong_cao_nhat} ${result.maxsalary}`)


const check_luong_trung_binh = (): number =>{
    let totalSalary: number = 0;
    for (const employee of danh_sach) {
        totalSalary += employee.salary;
    }
    return totalSalary / danh_sach.length;
}
const aveeage = check_luong_trung_binh();
console.log(`luong trung binh la ${aveeage}`)


const dem_so_luong_QA = () :number =>{
    let so_luong_QA: number = 0;
    for (const employee of danh_sach) {
        if (employee.department === 'QA') {
            so_luong_QA++;
        }
    }
    return so_luong_QA;
}
const so_luong = dem_so_luong_QA();
console.log(`so_luong QA hien co la ${so_luong}`)
});

