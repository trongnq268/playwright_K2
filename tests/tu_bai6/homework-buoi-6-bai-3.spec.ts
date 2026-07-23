import { test, expect } from "@playwright/test";
import {
  Order,
  calculateRevenue,
  countCompletedOrders,
  loadOrders,
} from "../../helpers/orderHelper";

test("Order Management", async () => {
  const orders: Order[] = [
    {
      id: "POM56982",
      customer: "Luu Bao Thanh",
      total: 2365800,
      status: "SUCCESS",
    },
    {
      id: "POA56542",
      customer: "Vuong Trung Kien",
      total: 25000,
      status: "SUCCESS",
    },
    {
      id: "POB89713",
      customer: "Hoang Thanh Tung",
      total: 1150000,
      status: "FAIL",
    },
    {
      id: "PMI47812",
      customer: "Duong Trieu Vy",
      total: 698000,
      status: "PROCESSING",
    },
    {
      id: "POM58982",
      customer: "Tong Kieu Anh",
      total: 1475200,
      status: "FAIL",
    },
  ];

  const main = async () => {
    await loadOrders(orders);
    const countSuccessOrders = countCompletedOrders(orders);
    const totalRevenue = calculateRevenue(orders);
    console.log(`Number of success orders: ${countSuccessOrders}`);
    console.log(`Total revenue: ${totalRevenue.toLocaleString("en-US")} VND`);
    return totalRevenue; 
  };
  
  await main();
});
