import { test, expect } from "@playwright/test";

interface Product {
  name: string;
  price: number;
  quantity: number;
}

test("Bài 4", async () => {
  const products: Product[] = [
    { name: "Laptop", price: 1000, quantity: 2 },
    { name: "Mouse", price: 30, quantity: 3 },
    { name: "Keyboard", price: 80, quantity: 1 },
    { name: "Monitor", price: 250, quantity: 4 },
    { name: "Headphone", price: 150, quantity: 2 },
    { name: "USB", price: 20, quantity: 5 },
  ];

  const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };


  const calculateTotal = (): number => {
    let total = 0;

    for (const product of products) {
      total += product.price * product.quantity;
    }

    return total;
  };

  const applyDiscount = (total: number): number => {
    if (total >= 3000) {
      return total * 0.8; // giảm 20%
    }

    if (total >= 2000) {
      return total * 0.85; // giảm 15%
    }

    if (total >= 1000) {
      return total * 0.9; // giảm 10%
    }

    return total;
  };

  // In hóa đơn
  const printInvoice = (subtotal: number, finalTotal: number): void => {
    console.log("\n========== INVOICE ==========");

    for (const product of products) {
      console.log(
        `${product.name} x${product.quantity} = ${product.price * product.quantity}`,
      );
    }

    console.log("-----------------------------");
    console.log(`Subtotal: ${subtotal}`);

    console.log(`Discount: ${subtotal - finalTotal}`);

    console.log(`Final: ${finalTotal}`);
  };


  const main = async (): Promise<number> => {
    await wait(2000);

    const subtotal = calculateTotal();

    const finalTotal = applyDiscount(subtotal);

    printInvoice(subtotal, finalTotal);

    return finalTotal;
  };

  const finalTotal = await main();

  // Verify
  expect(finalTotal).toBe(2856);
});
