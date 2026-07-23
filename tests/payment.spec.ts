import { test, expect } from "@playwright/test";
import {
  calculateTotalAmount,
  PayGateConnector,
  PaymentData,
} from "../helpers/paymentHelper";
//1915681.6011
test("Payment test", async () => {
  const transactions: PaymentData[] = [
    {
      transactionId: "pos101566",
      amount: 25600,
      status: "SUCCESS",
      fee: 0,
    },
    {
      transactionId: "pos101569",
      amount: 500600,
      status: "PROCESSING",
    },
    {
      transactionId: "pos101666",
      amount: 885000,
      status: "FAIL",
      fee: 52000,
    },
    {
      transactionId: "pos101766",
      amount: 125000,
      status: "SUCCESS",
    },
    {
      transactionId: "pos101564",
      amount: 280600,
      status: "SUCCESS",
      fee: 40000,
    },
  ];
  const totalTransAmt = calculateTotalAmount(transactions);
  console.log(`Total amount of all transactions: ${totalTransAmt}`);
  const testPayGate = new PayGateConnector();
  const testGateWay = testPayGate.gateWayName;
  const main = async () => {
    try {
      const testResult = await testPayGate.fetchTransaction(testGateWay);
      return testResult;
    } catch (error: any) {
      return error.message;
    }
  };
  const fetchResult = await main();
  console.log(fetchResult)
});



   



