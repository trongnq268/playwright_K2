
import { test, expect } from '@playwright/test';

test('Bai tap 2', async () => {
const action : string[] = ["Login", "Logout","SignUp"];
for ( const name of action){
    console.log(`Hanh dong ${name}`);
    expect(action[0]).toEqual("Login");
    expect(action[1]).toEqual("Logout");
    expect(action[2]).toEqual("SignUp");

}    
});

test('Bai tap 3', async () => {
const status : string[] = ["PASS","FAIL","PASS","BLOCKED","FAIL"];
let soLanPASS: number =0;
let soLanFAIL: number = 0;
let soLanBLOCKED: number = 0;
for (const i of status){
    if(i === "PASS"){
        console.log(`So lan chay vao PASS`);
    }else if(i==="BLOCKED"){
        console.log(`So lan chay vao BLOCKED`);
    }else{
        console.log(`So lan chay vao FAIL`);

    }
}
});


test('Bai tap 3.2', async () => {

    // Gọi hàm với dữ liệu
    const statuses = ['PASS', 'FAIL', 'PASS', 'BLOCKED', 'FAIL'];
    countStatuses(statuses);

    function countStatuses(statuses: string[]): void {
  // Khởi tạo biến đếm
  let passCount = 0;
  let failCount = 0;
  let blockedCount = 0;

  // Duyệt qua mảng bằng for
  for (let i = 0; i < statuses.length; i++) {
    if (statuses[i] === "PASS") {
      passCount++;
    } else if (statuses[i] === "FAIL") {
      failCount++;
    } else if (statuses[i] === "BLOCKED") {
      blockedCount++;
    }
  }

  // In kết quả
  console.log("PASS =", passCount);
  console.log("FAIL =", failCount);
  console.log("BLOCKED =", blockedCount);
}


});

test('Bai tap 6', async () => {
const testNames = ['Login', 'Logout', 'SignUp'];
for (const testName of testNames) {
  // testName tự động đại diện cho phần tử hiện tại
  console.log(testName);
}

  });



test('Demo 5: Lọc danh sách test case bị fail', async () => {
  const testNames: string[] = ['Login', 'Logout', 'SignUp', 'Create Order'];
  const testResults: boolean[] = [true, true, false, false];

  const failedTests: string[] = [];

  // Sử dụng vòng lặp for truyền thống để dùng chỉ số i
  for (let i = 0; i < testNames.length; i++) {
    if (testResults[i] === false) {
      failedTests.push(testNames[i]);
      console.log(`Test bị fail: ${testNames[i]}`);
    }
  }

  expect(failedTests).toEqual(['SignUp', 'Create Order']);
});



test('Bai tap 16', async () => {
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
    scores: [7, 8, 9, 10]
  }
];

function calculateAverage(scores: number[]): number {
  let sum = 0;

  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }

  return sum / scores.length;
}

let highestAverage = 0;
let topStudent = students[0];

for (let i = 0; i < students.length; i++) {
  const avg = calculateAverage(students[i].scores);

  console.log(`${students[i].name}: ${avg.toFixed(2)}`);

  if (avg > highestAverage) {
    highestAverage = avg;
    topStudent = students[i];
  }
}

console.log("\nHọc sinh có điểm trung bình cao nhất:");
console.log(`${topStudent.name}: ${highestAverage.toFixed(2)}`);

  });


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
    //console.log(`Luong cua nhan vien A la ${nhanVienA}`);
    
    //Dùng vòng lặp for kết hợp if để tìm nhân viên có lương cao nhất.
    // Đoạn này nhờ thầy sửa giúp em với ạ, em chưa nghĩ ra làm sao để tìm ra nhân viên nào có mức lương cao nhất ạ
    const luongNhanVien : number[]=[nhanVienA, nhanVienB, nhanVienC, nhanVienD];

    for (let i = 0; i < luongNhanVien.length; i++){
       
    }
});