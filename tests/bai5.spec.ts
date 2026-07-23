import { test, expect } from "@playwright/test";

test("Bài tập luyện tập 5- function", async () => {
  let addFee2: string;
  const addFee1: number = 1;
  let isFee: boolean;

  const addFee = (amount: number, qty: number, fee: number = 0.001): void => {
    const feeShip = amount * fee * qty;
    // return  amount + feeShip;
  };

  function functionVoid(amount: number, fee: number = 0.001): void {
    const feeShip = amount * fee * 10;
    amount > feeShip;
  }

  const iphoneTotalAmount = addFee(1000, 3, 0.003);
  const SamsungTotalAmount = addFee(1000, 3);
  console.log(iphoneTotalAmount);

  interface PaymentData {
    transaction: string;
    amount: number;
  }

  function transacitonInffo(transaction: string, amount: number): PaymentData {
    const transaction1: PaymentData = {
      transaction: transaction,
      amount: amount,
    };
    return transaction1;
  }

  async function transacitonInfo(transaction: string, amount: number): Promise<PaymentData> {
    const transaction1: PaymentData = {
      transaction: transaction,
      amount: amount,
    };
    return transaction1;
  }

  

  function transacitonInfo1(transaction: string, amount: number): string {
    const transaction1: PaymentData = {
      transaction: transaction,
      amount: amount,
    };

    return transaction;
  }

  const transactionInfo = transacitonInffo("transaction info", 10000);
  console.log(transactionInfo);
  const transactionInfo1 = transacitonInfo1("transaction info", 10000);
  console.log(transactionInfo1);

  // async function safeFetch(id: string): Promise<void> {
  //   try {
  //     const data = await fetchPaymentRaw(id); // chờ ở đây
  //     console.log("Lấy được:", data.transactionId);
  //   } catch (error) {
  //     console.error("Lỗi:", (error as Error).message);
  //   }
  // }
});
