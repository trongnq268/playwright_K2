export interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
}

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const loadOrders = async (orders: Order[]): Promise<Order[]> => {
  console.log("Loading orders....");
  await wait(2000);
  return orders;
};

export const calculateRevenue = (orders: Order[]): number => {
  let totalRevenue: number = 0;
  for (const order of orders) {
    //revenue only counts orders with success status
    if (order.status == "SUCCESS") {
      totalRevenue += order.total;
    }
  }
  return totalRevenue;
};

export const countCompletedOrders = (orders: Order[]): number => {
  let count: number = 0;
  for (const order of orders) {
    if (order.status === "SUCCESS") {
      count++;
    }
  }
  return count;
};
