import { test, expect } from "@playwright/test";

test("BMI Classification", async () => {
  let height: number = 1.5;
  let weight: number = 50;
  let bmi: number = weight / (height * height);

  if (bmi < 18.5) {
    console.log("Underweight");
  } else if (18.5 <= bmi && bmi < 24.9) {
    console.log("Normal");
  } else if (25 <= bmi && bmi < 29.9) {
    console.log("Overweight");
  } else {
    console.log("Obese");
  }
});

test("Thực hành 2: BMI Calculator", async () => {
  let weight: number = 1000;
  let height: number = 1.76;
  let BMI: number = weight / (height * height);

  // if(BMI < 18.5){
  //     console.log('Thiếu cân!');
  // }
  // else if(BMI >= 18.5 && BMI <= 24.9){
  //     console.log('Bình thường!');
  // }
  // else if(BMI >= 25 && BMI <= 29.9){
  //     console.log('Thừa cân!');
  // }
  // else{
  //     console.log('Péo phì!');
  // }

  // if(BMI < 18.5){
  //     console.log('Thiếu cân!');
  // };

  // if(BMI >= 18.5 && BMI <= 24.9){
  //     console.log('Bình thường!');
  // }

  if (BMI >= 25 && BMI <= 29.9) 
  console.log("Thừa cân!");
});
// console.log("Không điều kiện nào đúng cả")
test("Thực hành 4:", async () => {
  let balance: number = 5000000;
  let thang: number;
  let transType: number = 0;
  let transAmount = 0;

  for (thang = 1; thang <= 12; thang++) {
    if (thang % 3 === 0) {
      balance = balance + 3000000;
      transType = 0;
      transAmount = 3000000;
    } else if (thang % 2 === 0) {
      balance = balance - 1500000;
      transType = 1;
      transAmount = 1500000;
    } else {
      balance = balance - 500000;
      transType = 1;
      transAmount = 500000;
    }
    console.log("-------------------------------");
    // console.log("Tháng: ", i);
    // if (transType === 0) console.log("Giao dịch: Nạp tiền");
    // else console.log("Giao dịch: Rút tiền");
    // console.log("Số tiền: ", transAmount);
    // console.log("Số tiền sau khi thực hiện giao dịch: ", balance);

    console.log(
      `Thang ${thang} loại giao dịch: ${transType} và số tiền ${transAmount} `,
    );
  }
  console.log("=========================");
  console.log("BÁO CÁO CUỐI NĂM");
  console.log("Số dư cuối năm: ", balance);
});
