/* ASSIGNMENT 1: BMI CALCULATOR

Chủ đề: Xây dựng công cụ tính chỉ số BMI (Body Mass Index) và đánh giá sức khỏe. Mục đích: Rèn luyện if-else (logic rẽ nhánh) và toán tử tính toán. Logic này tương tự việc verify kết quả test (Nếu kết quả < X thì Fail, ngược lại thì Pass).

1. Khai báo 2 biến hằng số (const):
   - cân nặng (kg)
   - chiều cao (m)
2. Tính chỉ số BMI theo công thức: BMI = cân nặng / (chiều cao * chiều cao).
3. Sử dụng cấu trúc if-else if-else để in ra kết quả dựa trên BMI:
   - BMI < 18.5: "Thiếu cân"
   - BMI từ 18.5 đến 24.9: "Bình thường"
   - BMI từ 25 đến 29.9: "Thừa cân"
   - BMI >= 30: "Béo phì"
4. Yêu cầu kỹ thuật:
   - Phải định nghĩa kiểu dữ liệu (number, string) rõ ràng.
   - In ra console kết quả dạng: "BMI của bạn là: [số]. Đánh giá: [Trạng thái]".
   */

import { test, expect } from "@playwright/test";

test("Assignment 1: BMI Calculator", async () => {
  // Khai báo biến hằng số
  const weight: number = 70; // cân nặng (kg)
  const height: number = 1.75; // chiều cao (m)

  // Tính chỉ số BMI
  const bmi: number = weight / (height * height);

  // Đánh giá tình trạng cơ thể
  let status: string;
  if (bmi < 18.5) {
    status = "Thiếu cân";
  } else if (bmi >= 18.5 && bmi < 25) {
    status = "Bình thường";
  } else if (bmi >= 25 && bmi < 30) {
    status = "Thừa cân";
  } else {
    status = "Béo phì";
  }

  // In kết quả ra console
  console.log(`BMI của bạn là: ${bmi}. Đánh giá: ${status}.`);
  // Kiểm tra kết quả status so với thực tế
  expect(status).toEqual("Bình thường");
});
