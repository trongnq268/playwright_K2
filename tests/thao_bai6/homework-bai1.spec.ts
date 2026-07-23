import { test, expect } from "@playwright/test";

interface Employee {
  id: string;
  name: string;
  age: number;
  salary: number;
  department: string;
}

test("Homework bai 1", async () => {
  const employees: Employee[] = [
    {
      id: "01",
      name: "Hoang Mai Anh",
      age: 25,
      salary: 2500,
      department: "IT",
    },
    {
      id: "02",
      name: "Nguyen Quoc An",
      age: 23,
      salary: 2300,
      department: "Marketing",
    },
    {
      id: "03",
      name: "Dinh Mai Linh",
      age: 28,
      salary: 3000,
      department: "QA",
    },
    {
      id: "04",
      name: "Nguyen Tuan Anh",
      age: 30,
      salary: 3600,
      department: "QA",
    },
    { id: "05", name: "Do Phuong Ha", age: 21, salary: 1390, department: "HR" },
    { id: "06", name: "Mai Tuan Tu", age: 27, salary: 2900, department: "IT" },
  ];

  const findHighestSalary = (): Employee => {
    let highest = employees[0];

    for (const employee of employees) {
      if (employee.salary > highest.salary) {
        highest = employee;
      }
    }

    return highest;
  };

  const calculateAverageSalary = (): number => {
    let totalSalary = 0;

    for (const employee of employees) {
      totalSalary += employee.salary;
    }

    return totalSalary / employees.length;
  };

  const countDepartment = (departmentName: string): number => {
    let count = 0;

    for (const employee of employees) {
      if (employee.department === departmentName) {
        count++;
      }
    }

    return count;
  };

  const highestSalaryEmployee = findHighestSalary();
  const averageSalary = calculateAverageSalary();
  const qaEmployees = countDepartment("QA");

  // In kết quả
  console.log("\n========== QUẢN LÝ NHÂN VIÊN ==========");
  console.log(`Nhân viên lương cao nhất: ${highestSalaryEmployee.name}`);
  console.log(`Lương: ${highestSalaryEmployee.salary}`);

  console.log("---------------------------------------");
  console.log(`Lương trung bình: ${averageSalary}`);

  console.log("---------------------------------------");
  console.log(`Số nhân viên phòng QA: ${qaEmployees}`);

  // Verify
  expect(highestSalaryEmployee.name).toBe("Nguyen Tuan Anh");
  expect(averageSalary).toBe(2615);
  expect(qaEmployees).toBe(2);
});
