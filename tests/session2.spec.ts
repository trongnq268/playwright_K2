import { test, expect } from "@playwright/test";


test("Kế toán viên tập sự", async () => {
  let user01: string = "nguyen van b";
  let user02: string = "Nguyen van a";

  let age1: number = 25;
  let age2: number = 26;

  console.log(`thoong tin user ${user01} va ${age2}`);

  const user03 = {
    user01: "Nguyen van a",
    age1: "26",
  };

  const user04 = {
    user01: "Nuyen van a",
    age1: 26,
    key: true,
  };

  const add = {
    tenDuong: "Thanh Xuân",
    soNha: 24,
  };
  console.log(add.soNha);
  console.log(add.tenDuong);

  const array01: string[] = ["a", "b", "c"];

  console.log(array01[2]);

  const testCases = [
    {
      name: "Login",
      passed: true,
    },
    {
      name: "Logout",
      passed: true,
    },
    {
      name: "SignUp",
      passed: false,
    },
  ];

  const testcase1 = {
    name: "Login",
    passed: true,
  };
  const testcase2 = {
    name: "Logout",
    passed: true,
  };
});

test("bai cua an", async () => {
  const hoa_don = {
    khach_hang: [
      {
        id: "O01",
        ten: "an",
        total: 500,
        paid: true,
      },
      {
        id: "O02",
        ten: "Binh",
        total: 2200,
        paid: false,
      },
      {
        id: "O03",
        ten: "Lan",
        total: 1200,
        paid: true,
      },
      {
        id: "O04",
        ten: "Nam",
        total: 3500,
        paid: false,
      },
      {
        id: "O05",
        ten: "Mai",
        total: 800,
        paid: true,
      },
      {
        id: "O06",
        ten: "Linh",
        total: 4200,
        paid: false,
      },
    ],
  };
  console.log(hoa_don.khach_hang[0].id);

  for (const chua_thanh_toan of hoa_don.khach_hang) {
    if (chua_thanh_toan.paid === false) {
      console.log("Hoa don chua thanh toan la :", chua_thanh_toan);
    }
  }
  let tong_doanh_thu: number = 0;
  for (const khach_hang of hoa_don.khach_hang) {
    if (khach_hang.total) {
      tong_doanh_thu += khach_hang.total;
    }
  }
  console.log(`tong doanh thu = ${tong_doanh_thu}`);

  let chua_thanh_toan: number = 0;
  for (const khach_hang of hoa_don.khach_hang) {
    if (khach_hang.paid === false) {
      chua_thanh_toan += khach_hang.total;
    }
  }
  console.log(`chua thanh toan = ${chua_thanh_toan}`);
  let da_thanh_toan: number = 0;
  for (const khach_hang of hoa_don.khach_hang) {
    if (khach_hang.paid === true) {
      da_thanh_toan += khach_hang.total;
    }
  }
  console.log(`da thanh toan = ${da_thanh_toan}`);

  let don_hang_max: number = 0;
  for (const khach_hang of hoa_don.khach_hang) {
    if (khach_hang.total > don_hang_max) {
      don_hang_max = khach_hang.total;
    }
  }
  console.log(`don hang lon nhat la : ${don_hang_max}`);
});
// test("Thực hành - buổi 6", async () => {
//   const orderList = [
//     { id: "O01", customer: "An", total: 500, paid: true },
//     { id: "O02", customer: "Bình", total: 2200, paid: false },
//     { id: "O03", customer: "Lan", total: 1200, paid: true },
//     { id: "O04", customer: "Nam", total: 3500, paid: false },
//     { id: "O05", customer: "Mai", total: 800, paid: true },
//     { id: "O06", customer: "Linh", total: 4200, paid: false },
//   ];
//   // in các đơn chưa thanh toán
//   console.log("---Các đơn hàng chưa thanh toán---");
//   let totalRevenue = 0;
//   let unpaid = 0;
//   let paid = 0;
//   let max = 0;
//   for (const printOrder of orderList) {
//     totalRevenue += printOrder.total;
//     if (printOrder.paid === false) {
//       console.log(`Đơn hàng ${printOrder.id}`);
//       unpaid += printOrder.total;
//     }
//     if (max < printOrder.total) max = printOrder.total;
//     paid += printOrder.total;
//   }

//   // Tổng doanh thu
//   console.log(`Tổng doanh thu tất cả đơn hàng là: ${totalRevenue}`);
//   console.log(`Tổng doanh thu chưa thanh toán là: ${unpaid}`);
//   console.log(`Tổng doanh thu đã thanh toán là: ${paid}`);

//   for (const checkMax of orderList) {
//     if (max === checkMax.total) {
//       console.log(`Đơn hàng có giá trị lớn nhất là: ${checkMax.id}`);
//     }
//   }
// });

test("Thực hành - buổi 6", async () => {
  const orderList = [
    { id: "O01", customer: "An", total: 500, paid: true },
    { id: "O02", customer: "Bình", total: 2200, paid: false, qty: 10 },
    {
      id: "O03",
      customer: "Lan",
      total: 1200,
      paid: true,
      phone: "0987654323",
    },
    { id: 4, customer: "Nam", total: 3500, paid: false },
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
});

test("Thực hành ", async () => {
  //In hoa don chua thanh toan
  const bills = [
    { id: "O01", customer: "An", total: 500, paid: true },
    { id: "O02", customer: "Binh", total: 2200, paid: false },
    { id: "O03", customer: "Lan", total: 1200, paid: true },
    { id: "O04", customer: "Nam", total: 3500, paid: false },
    { id: "O05", customer: "Mai", total: 800, paid: true },
    { id: "O06", customer: "Linh", total: 4200, paid: false },
  ];
  for (const bill of bills) {
    if (bill.paid === false) {
      console.log(
        `ID:${bill.id}, Customer:${bill.customer}, Total:${bill.total}`,
      );
    }
  }
  //Tinh doanh thu
  let totalRevenue = 0;
  let paidRevenue = 0;
  let unpaidRevenue = 0;

  for (const bill of bills) {
    totalRevenue += bill.total;

    if (bill.paid) {
      paidRevenue += bill.total;
    } else {
      unpaidRevenue += bill.total;
    }
  }
  console.log("===== DOANH THU =====");
  console.log("Tổng doanh thu:", totalRevenue);
  console.log("Doanh thu đã thanh toán:", paidRevenue);
  console.log("Doanh thu chưa thanh toán:", unpaidRevenue);

  //Don hang lon nhat
  let maxBill = bills[0];

  for (const bill of bills) {
    if (bill.total > maxBill.total) {
      maxBill = bill;
    }
  }
  console.log("\n===== ĐƠN HÀNG LỚN NHẤT =====");
  console.log(
    `Đơn hàng lớn nhất là của ${maxBill.customer} với số tiền ${maxBill.total}`,
  );
});

test("Orders Total", async () => {
  const orders = [
    {
      orderId: "O01",
      customer: "An",
      total: 500,
      paid: true,
    },
    {
      orderId: "O02",
      customer: "Binh",
      total: 2200,
      paid: false,
    },
    {
      orderId: "O03",
      customer: "Lan",
      total: 1200,
      paid: true,
    },
    {
      orderId: "O04",
      customer: "Nam",
      total: 3500,
      paid: false,
    },
    {
      orderId: "O05",
      customer: "Mai",
      total: 800,
      paid: true,
    },
    {
      orderId: "O06",
      customer: "Linh",
      total: 4200,
      paid: false,
    },
  ];

  let totalAmt: number = 0;
  for (const order of orders) {
    totalAmt += order.total;
  }

  let totalPaidAmt: number = 0;
  let totalUnpaidAmt: number = 0;

  for (const order of orders) {
    if (order.paid === true) {
      totalPaidAmt += order.total;
    } else {
      totalUnpaidAmt += order.total;
    }
  }

  let maxOrder = {
    id: orders[0].orderId,
    total: orders[0].total,
  };
  for (const order of orders) {
    if (order.total > maxOrder.total) {
      maxOrder = {
        id: order.orderId,
        total: order.total,
      };
    }
  }
  console.log(
    `Order with max value: OrderId: ${maxOrder.id}, ${maxOrder.total}`,
  );
  console.log(`Sum of all orders: ${totalAmt}`);
  console.log(`Sum of all unpaid orders: ${totalUnpaidAmt}`);
  console.log(`Sum of all paid orders: ${totalPaidAmt}`);
});

test("Luyện tập buổi 6", async () => {
  const orderList = [
    { id: "001", customer: "An", total: 500, paid: true },
    { id: "002", customer: "Bình", total: 2200, paid: false },
    { id: "003", customer: "Lan", total: 1200, paid: true },
    { id: "004", customer: "Nam", total: 3500, paid: false },
    { id: "005", customer: "Mai", total: 800, paid: true },
    { id: "006", customer: "Linh", total: 4200, paid: false },
  ];

  let totalRevenue = 0;
  let falsePaid: String;
  let totalRevenuePaid = 0;
  let totalRevenueUnPaid = 0;
  let maxOrder = orderList[0];

  for (const order of orderList) {
    totalRevenue += order.total;

    // 1. In ra đơn chưa thanh toán
    if (order.paid === false) {
      falsePaid = order.id;
      totalRevenueUnPaid += order.total;
      console.log(`Đơn chưa thanh toán là: ${falsePaid}`);
    }

    if (order.paid === true) {
      totalRevenuePaid += order.total;
    }

    if (order.total > maxOrder.total) {
      maxOrder = order;
    }
  }

  console.log(`Tổng doanh thu: ${totalRevenue}`);
  console.log(`Tổng doanh thu đã thanh toán: ${totalRevenuePaid}`);
  console.log(`Tổng doanh thu chưa thanh toán: ${totalRevenueUnPaid}`);
  console.log(`Đơn hàng có giá trị lớn nhất là: ${maxOrder.id}`);
});
