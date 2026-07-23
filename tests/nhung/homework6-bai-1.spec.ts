import { test, expect} from '@playwright/test';

// 1. Tạo interface Employee - bên trên ngoài test
interface Employee{
    id: string;
    name: string;
    age: number;
    salary: number;
    department: string;
}

test ('Bài 1. Quản lý nhân viên (Object + Interface + Function)', async()=>{
    // 2. Tạo mảng gồm 6 nhân viên
    const employeeList: Employee[] = [
        {   id: 'NV01', name: 'An', age: 22, salary: 8000000, department: 'QA'},
        {   id: 'NV02', name: 'Bình', age: 23, salary: 5000000, department: 'BA'},
        {   id: 'NV03', name: 'Phương', age: 32, salary: 15000000, department: 'Dev'},
        {   id: 'NV04', name: 'Thuỷ', age: 26, salary: 4500000, department: 'QA'},
        {   id: 'NV05', name: 'Quỳnh', age: 21, salary: 6500000, department: 'QA'},
        {   id: 'NV06', name: 'Ngân', age: 20, salary: 2500000, department: 'BA'}
    ]
    // 3. Viết các func + 4. In kết quả ra consol.log
    const findHighestSalary = (employees: Employee[]): number => {
        let maxSalary = employees[0].salary;
        for (const checkMax of employees){
            if (maxSalary < checkMax.salary) { maxSalary = checkMax.salary }
        }
        return maxSalary;
    };
    console.log(`Mức lương lớn nhất là: ${findHighestSalary(employeeList)}`);
    
    const calculateAverageSalary = (employees: Employee[]): number =>{
        let sumSalary = 0;
        let sumEmployee = 0;
        for (const salary of employees){
            sumSalary += salary.salary;
            sumEmployee += 1;
        }
        return sumSalary/sumEmployee;
    }
    console.log(`Lương trung bình là: ${calculateAverageSalary(employeeList)}`);
    
    const countDepartment = (employees: Employee[]): number =>{
        let count = 0;
        for (const findQA of employees){
            if (findQA.department === 'QA') count+=1;
        }
        return count;
    }
    console.log(`Số nhân viên phòng QA là: ${countDepartment(employeeList)}`);
    
    // 5. Dùng expect để kiểm tra
    expect(findHighestSalary(employeeList)).toEqual(15000000);
    expect(calculateAverageSalary(employeeList).toFixed(2)).toEqual('6916666.67');
    expect(countDepartment(employeeList)).toEqual(3);
});