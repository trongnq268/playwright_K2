import { test, expect } from '@playwright/test';

test('assignment_1', async () => {

const weight: number = 60;
const height: number = 1.72;
const bmi: number = weight / (height * height);
let status: string;

if (bmi < 18.5) {
    status = "Thiếu cân";
} else if (bmi >= 18.5 && bmi <= 24.9) {
    status = "Bình thường";
} else if (bmi >= 25 && bmi <= 29.9) {
    status = "Thừa cân";
} else {
    status = "Béo phì";
}

console.log(`BMI của bạn là: ${bmi}. Đánh giá: ${status}`);
});