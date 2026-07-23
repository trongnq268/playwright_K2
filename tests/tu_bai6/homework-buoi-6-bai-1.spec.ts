import { test, expect } from "@playwright/test";
// import { Employee } from "../../helpers/employeeHelper";
import {
  Employee,
  calculateAverageSalary,
  countDepartments,
  findHighestSalary,
} from "../../helpers/employeeHelper";

test("Employees Management", async () => {
  
  const employees: Employee[] = [
    {
      id: "EMP156",
      name: "Nguyen Ngoc Lien",
      age: 28,
      salary: 25000000,
      department: "QA",
    },
    {
      id: "EMP123",
      name: "Vuong Van Hao",
      age: 32,
      salary: 26500000,
      department: "SALES",
    },
    {
      id: "EMP148",
      name: "Hoang Bao Minh",
      age: 22,
      salary: 15000000,
      department: "SALES",
    },
    {
      id: "EMP188",
      name: "Hoang Bao Han",
      age: 22,
      salary: 8000000,
      department: "SALES",
    },
    {
      id: "EMP213",
      name: "Trinh Ha Anh",
      age: 26,
      salary: 23000000,
      department: "TA",
    },
    {
      id: "EMP1651",
      name: "Chu Ngoc Thao",
      age: 32,
      salary: 33000000,
      department: "QA",
    },
  ];

  let departmentName = "QA";
  const countEmpByDepartment = countDepartments( employees, departmentName);
  const highestPaidEmp = findHighestSalary(employees);
  const avgSalary = calculateAverageSalary(employees);

  console.log(`Highest paid employee : ${highestPaidEmp}`);
  console.log(`Average salary: ${avgSalary.toLocaleString("en-US")}`);
  console.log(
    `Number of employees in ${departmentName} department: ${countEmpByDepartment}`,
  );

  expect(avgSalary).toEqual(21750000);
  expect(highestPaidEmp).toBe("Chu Ngoc Thao");
  expect(countEmpByDepartment).toBe(2);
});
