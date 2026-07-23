import { test, expect } from "@playwright/test";

interface Product {
  name: string;
  price: number;
  quantity?: number;
}

test("Thực hành buổi 6", async () => {
  const mySelf = {
    name: "Nguyễn Hồng Nhung",
    age: 23,
    email: "nhungnh@gmail.com",
  };
  console.log(`Họ tên: ${mySelf.name}`);
  console.log(`Tuổi: ${mySelf.age}`);
  console.log(`Địa chỉ email: ${mySelf.email}`);
});

test("Thực hành - buổi 6", async () => {
  const orderList = [
    { id: "O01", customer: "An", total: 500, paid: true },
    { id: "O02", customer: "Bình", total: 2200, paid: false },
    { id: "O03", customer: "Lan", total: 1200, paid: true },
    { id: "O04", customer: "Nam", total: 3500, paid: false },
    { id: "O05", customer: "Mai", total: 800, paid: true },
    { id: "O06", customer: "Linh", total: 4200, paid: false },
  ];
  // in các đơn chưa thanh toán
  console.log("---Các đơn hàng chưa thanh toán---");
  let totalRevenue = 0;
  let unpaid = 0;
  let paid = 0;
  let max = 0;
  for (const printOrder of orderList) {
    totalRevenue += printOrder.total;
    if (printOrder.paid === false) {
      console.log(`Đơn hàng ${printOrder.id}`);
      unpaid += printOrder.total;
    }
    if (printOrder.paid === true) {
      console.log(`Đơn hàng ${printOrder.id}`);
      paid += printOrder.total;
    }
    if (max < printOrder.total) max = printOrder.total;
  }

  // Tổng doanh thu
  console.log(`Tổng doanh thu tất cả đơn hàng là: ${totalRevenue}`);
  console.log(`Tổng doanh thu chưa thanh toán là: ${unpaid}`);
  console.log(`Tổng doanh thu đã thanh toán là: ${paid}`);

  for (const checkMax of orderList) {
    if (max === checkMax.total) {
      console.log(`Đơn hàng có giá trị lớn nhất là: ${checkMax.id}`);
    }
  }

  const x: Product[] = [
    {
      name: "nhung",
      price: 123,
    },
  ];
});

const wait = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds); // Báo hoàn thành sau milliseconds
  });
};
const main = async () => {
  console.log("1. Bắt đầu");
  // Đợi 3 giây xong mới chạy tiếp dòng dưới
  await wait(3000);
  console.log("2. Đã tải xong dữ liệu");
};
test("async - await", async () => {
  await main();
  await main();
});
