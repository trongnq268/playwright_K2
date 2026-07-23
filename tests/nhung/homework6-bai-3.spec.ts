import { test, expect } from "@playwright/test";

interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
}

test("Bài 3 Quản lý đơn hàng (Object + Async/Await)", async () => {
  // Tạo 5 đơn hàng
  const orderList: Order[] = [
    { id: "O01", customer: "Nhung", total: 160000, status: "completed" },
    { id: "O02", customer: "Hoàng", total: 120000, status: "delivery" },
    { id: "O03", customer: "Bình", total: 150000, status: "reject" },
    { id: "O04", customer: "Hồng", total: 200000, status: "delivery" },
    { id: "O05", customer: "Long", total: 101000, status: "completed" },
  ];

  // Hàm wait
  const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };
  //   Hàm load order
  const loadOrder = async (): Promise<Order[]> => {
    console.log("Đang tải danh sách đơn hàng..");
    await wait(2000);
    return orderList;
  };

  // Hàm tính tổng doanh thu
  const calculateRevenue = (list: Order[]): number => {
    let totalRev = 0;
    for (const sum of list) totalRev += sum.total;
    return totalRev;
  };
  // console.log(`Tổng doanh thu là: ${calculateRevenue(orderList)}`);

  // Hàm đếm số đơn hàng completed
  const countCompleted = (list: Order[]): number => {
    let count = 0;
    for (const item of list) {
      if (item.status === "completed") count += 1;
    }
    return count;
  };
  // console.log(`Tổng số đơn hàng Completed là: ${countCompleted(orderList)}`);

  const main = async(): Promise<number> => {
    const orders = await loadOrder();
    console.log(orders);

    const totalRevenue = calculateRevenue(orderList);
    console.log(`Tổng doanh thu là: ${totalRevenue}`);

    const completed = countCompleted(orderList);
    console.log(`Số đơn completed là: ${completed}`);

    return totalRevenue;
  }
  const revenue = await main();
  expect(revenue).toBe(731000);
});
