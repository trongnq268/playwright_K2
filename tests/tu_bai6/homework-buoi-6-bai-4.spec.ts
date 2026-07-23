import { test, expect } from "@playwright/test";
import {
  Product,
  printInvoice,
  wait,
} from "../../helpers/productHelper";

test("Product Management", async () => {
  const products: Product[] = [
    {
      name: "Xiaomi Monitor",
      price: 2800000,
      quantity: 2,
    },
    {
      name: "Bluetooth Mouse",
      price: 250000,
      quantity: 10,
    },
    {
      name: "Logitech Keyboard",
      price: 150000,
      quantity: 8,
    },
    {
      name: "Mouse pad",
      price: 50000,
      quantity: 15,
    },
    {
      name: "Headphone",
      price: 3700000,
      quantity: 5,
    },
    {
      name: "Samsung Galaxy A54",
      price: 8100000,
      quantity: 6,
    },
  ];

  const main = async(): Promise<number> => {
    console.log('Calculating ....');
    await wait(3000);
    const finalTotal = printInvoice(products);
    return finalTotal;
  }
  const actualFinalTotal = await main();
  expect(actualFinalTotal).toBe(61720000);
});
