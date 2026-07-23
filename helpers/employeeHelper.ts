export interface Employee {
  id: string;
  name: string;
  age: number;
  salary: number;
  department: string;
}

export const findHighestSalary = (employeeList: Employee[]): string => {
  let maxSalaryEmp = {
    salary: employeeList[0].salary,
    name: employeeList[0].name,
  };

  for (const employee of employeeList) {
    if (employee.salary > maxSalaryEmp.salary) {
      maxSalaryEmp.salary = employee.salary;
      maxSalaryEmp.name = employee.name;
    }
  }
  return maxSalaryEmp.name;
};

export const calculateAverageSalary = (employeeList: Employee[]): number => {
  let totalSalary: number = 0;
  for (const staff of employeeList) {
    totalSalary += staff.salary;
  }
  return totalSalary / employeeList.length;
};

export const countDepartments = (employeeList: Employee[], departmentName: string): number => {
  let count: number = 0;
  for (const emp of employeeList) {
    if (emp.department === departmentName) {
      count++;
    }
  }
  return count;
};
