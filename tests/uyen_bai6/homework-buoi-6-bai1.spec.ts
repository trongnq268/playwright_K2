import { test, expect } from '@playwright/test';

interface Employee {
  id: string;
  name: string;
  age: number;
  salary: number;
  department: string;
};

test('Bài 1. Quản lý nhân viên (Object + Interface + Function)', async () => {
  const employees: Employee[] = [
    { id: 'E0001', name: 'Ngô Văn Hải', age: 28, salary: 18000000, department: 'Kế toán' },
    { id: 'E0002', name: 'Phùng Hải Anh', age: 24, salary: 16500000, department: 'C&B' },
    { id: 'E0003', name: 'Nguyễn Thị Mai', age: 27, salary: 19500000, department: 'QA' },
    { id: 'E0004', name: 'Trần Ngọc Hương', age: 30, salary: 15000000, department: 'Vận đơn' },
    { id: 'E0005', name: 'Phạm Hải Bình', age: 29, salary: 25000000, department: 'QA' },
    { id: 'E0006', name: 'Trịnh Thanh Thành', age: 32, salary: 35000000, department: 'QA' },
  ];

  // --------- TÌM & IN RA NHÂN VIÊN CÓ LƯƠNG CAO NHẤT ---------
  const findHighestSalary = (employees: Employee[]): Employee => {
    let highestSalaryEmployee = employees[0];

    for (let i = 1; i < employees.length; i++) {
      if (employees[i].salary > highestSalaryEmployee.salary) {
        highestSalaryEmployee = employees[i];
      }
    }
    return highestSalaryEmployee;
  };

  const result = findHighestSalary(employees);
  console.log(`Nhân viên có lương cao nhất là: ${result.name} (${result.salary.toLocaleString("vi-VN")} VNĐ)`);

  // Verify kết quả trả về đúng mong đợi là 35tr
  expect(result.salary).toEqual(35000000);

  // --------- TÍNH & IN RA LƯƠNG TRUNG BÌNH ---------
  const calculateAverageSalary = (employees: Employee[]): number => {
    let totalSalary = 0;

    for (let i = 0; i < employees.length; i++) {
      totalSalary += employees[i].salary;
    }
    return totalSalary / employees.length;
  };

  const averageSalary = calculateAverageSalary(employees);
  console.log(`Lương trung bình là: ${averageSalary.toLocaleString("vi-VN")} VNĐ`);

  // Verify KQ trả về đúng mong đợi là 21,5tr
  expect(averageSalary).toEqual(21500000);

  // --------- ĐẾM SỐ NHÂN VIÊN PHÒNG QA ---------
  const countDepartment = (employees: Employee[]): number => {
    let countQA = 0;
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].department == 'QA') {
        countQA++;
      }
    }
    return countQA;
  };

  const totalQA = countDepartment(employees);
  console.log(`Số nhân viên phòng QA là: ${totalQA}`);

  // Verify KQ trả về đúng mong đợi là 3
  expect(totalQA).toEqual(3);
});
