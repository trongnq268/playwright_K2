export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export const calculateTotal = (products: Product[]): number => {
  let total: number = 0;
  for (const product of products) {
    total += product.price * product.quantity;
  }
  return total;
};

export const applyDiscount = (total: number): number => {
  let discount: number = 0;
  if (total > 3000) {
    discount = total * 0.2;
  } else if (total < 3000 && total > 2000) {
    discount = total * 0.15;
  } else if (total > 1000 && total < 2000) {
    discount = total * 0.1;
  } else {
    discount = 0;
  }
  return discount;
};

export const printInvoice = (products: Product[]): number => {
  let subTotal: number = calculateTotal(products);
  let discountAmt: number = applyDiscount(subTotal);
  let finalTotal: number = subTotal - discountAmt;
  console.log("===============INVOICE===============");
  for (const product of products) {
    const itemTotal = product.price * product.quantity;
    console.log(
      `${product.name} x ${product.quantity} = ${itemTotal.toLocaleString("en-US")}`,
    );
  }
  console.log("=====================================");
  console.log(`Subtotal: ${subTotal.toLocaleString("en-US")}`);
  console.log(`Discount: ${discountAmt.toLocaleString("en-US")}`);
  console.log(`Final total: ${finalTotal.toLocaleString("en-US")}`);
  return finalTotal;
};

export const wait = (ms: number): Promise<void> =>{
    return new Promise((resolve) =>{
        setTimeout(resolve, ms);
    })
}

