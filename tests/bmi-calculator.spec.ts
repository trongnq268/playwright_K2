import { test, expect } from '@playwright/test';


const bmiTestData = [
  { height: 2.0, weight: 73.6, expectedStatus: 'Thiếu cân', note: 'TC01 - Sát dưới biên 18.5 (BMI = 18.40)' },
  { height: 2.0, weight: 74.0, expectedStatus: 'Bình thường', note: 'TC02 - Chính xác tại biên 18.5 (BMI = 18.50)' },

  { height: 2.0, weight: 99.2, expectedStatus: 'Bình thường', note: 'TC03 - Sát dưới biên 24.9 (BMI = 24.80)' },
  { height: 2.0, weight: 100.0, expectedStatus: 'Thừa cân', note: 'TC04 - Chính xác tại biên 25.0 (BMI = 25.00)' },

  { height: 2.0, weight: 119.2, expectedStatus: 'Thừa cân', note: 'T05 - Sát dưới biên 29.9 (BMI = 29.80)' },
  { height: 2.0, weight: 120.0, expectedStatus: 'Béo phì', note: 'TC06 - Chính xác tại biên 30.0 (BMI = 30.00)' },
];

test.describe('Tính chỉ số BMI và đánh giá sức khỏe \n', () => {
  for (const data of bmiTestData) {
    test(`${data.note}`, async () => {
      const weight: number = data.weight;
      const height: number = data.height;
      const bmi = weight / (height * height);
      let status: string = "";

      if (bmi < 18.5) {
        status = "Thiếu cân";
      } else if (bmi >= 18.5 && bmi < 24.9) {
        status = "Bình thường";
      } else if (bmi >= 25 && bmi < 29.9) {
        status = "Thừa cân";
      } else {
        status = "Béo phì";
      }
      console.log(`Chiều cao: ${height}m | Cân nặng: ${weight}kg`);
      console.log(`BMI của bạn là: ${bmi}. Đánh giá: ${status}`);
      console.log(`--------------------------------------------------`);
      expect(status).toBe(data.expectedStatus);
    });
  }
});


