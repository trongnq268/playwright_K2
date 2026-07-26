import { test, expect } from '@playwright/test';
// Bai 1: Quan ly nhan vien
// 1.	Tạo interface Employee 
interface Employee {
    id: string;
    name: string;
    age: number;
    salary: number;
    department: string;
};

test('Bai 1', async () => {
//2.	Tạo mảng gồm 6 nhân viên. 
    const employeeInfo: Employee[] = [
        {id: "A01", name: "Nguyen Van A", age: 28, salary: 1000, department: "Le tan"},
        {id: "A02", name: "Le Thi B", age: 28, salary: 3000, department: "QA"},
        {id: "A03", name: "Hoang Minh C", age: 29, salary: 2000, department: "Nhan su"},
        {id: "A04", name: "Vo Tan D", age: 25, salary: 1500, department: "QA"},
        {id: "A05", name: "Nguyen Le Minh H", age: 23, salary: 800, department: "QA"},
        {id: "A06", name: "Nguyen Hoang T", age: 29, salary: 1900, department: "Nhan su"},
    ];
//3.Viết function findHighestSalary() 
    let highestSalary = employeeInfo[0]
    for (let employee of employeeInfo){
        if(highestSalary.salary < employee.salary){
            highestSalary = employee
        } else {
            highestSalary = highestSalary
        };
    };
    console.log(`Nhan vien co luong cao nhat la: ${highestSalary.name} = ${highestSalary.salary}`);

//Viết function calculateAverageSalary() 
    const calculateAverageSalary= (employeeInfo: Employee[]): number => {
        let totalSalary = 0;
        for (let avgSalary of employeeInfo){
            totalSalary = totalSalary + avgSalary.salary;
        };
        return totalSalary / employeeInfo.length;
    }
    let avgSalaryEmployee = calculateAverageSalary(employeeInfo);
    console.log (`Luong trung binh cua nhan vien la: ${avgSalaryEmployee}`);
 
//Viết function countDepartment(departmentName)
    const countDepartment = (employeeInfo: Employee[]): number => {
        let count = 0;
        for(let countdepartment of employeeInfo){
            if(countdepartment.department === "QA"){
                count = count + 1;
            }else{
                count = count;
            }
        }
        return count;
    }
    let countQA = countDepartment(employeeInfo);
    console.log(`So nhan vien phong QA = ${countQA}`);

 //5.	Dùng expect() để kiểm tra: 
    expect(highestSalary.salary === 3000).toBe(true);
    expect(avgSalaryEmployee === 1700).toBe(true);
    expect(countQA === 3).toBe(true);
});


