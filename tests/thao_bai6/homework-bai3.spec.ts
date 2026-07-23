import { test, expect } from "@playwright/test";

interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
}

test("Bai 3", async () => {
  const orders: Order[] = [
    { id: "01", customer: "Hoàng Hà Linh", total: 1400, status: "Completed" },
    {
      id: "02",
      customer: "Nguyễn Thiện Phúc",
      total: 3000,
      status: "Completed",
    },
    { id: "03", customer: "Đinh Phương Hoa", total: 230, status: "Pending" },
    { id: "04", customer: "Trần Đình Bắc", total: 3254, status: "Cancelled" },
    { id: "05", customer: "Mai Nam Hải", total: 2401, status: "Completed" },
  ];

  const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const loadOrders = async (): Promise<Order[]> => {
    console.log("Đang tải danh sách đơn hàng...");
    await wait(2000);
    console.log("Tải thành công!");
    return orders;
  };

  const calculateRevenue = (): number => {
    let total = 0;
    for (const order of orders) {
      total += order.total;
    }
    return total;
  };
  const countCompleted = (): number => {
    let count = 0;
    for (const order of orders) {
      if (order.status === "Completed") {
        count++;
      }
    }
    return count;
  };

  const main = async (): Promise<number> => {
    const orderList = await loadOrders();
    const revenue = calculateRevenue();
    const completed = countCompleted();

    console.log(`Total Revenue: ${revenue}`);
    console.log(`Completed Orders: ${completed}`);

    return revenue;
  };

  const revenue = await main();

  // Verify
  expect(revenue).toBe(10285);
});
