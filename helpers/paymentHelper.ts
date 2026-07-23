export type PaymentData = {
  transactionId: string;
  amount: number;
  status: string;
  fee?: number;
};

export const calculateTotalAmount = (transactions: PaymentData[]): number => {
  const totalAmt = transactions.reduce<number>((total, trans) => {
    return total + trans.amount + (trans.fee || trans.amount * 0.011);
  }, 0);
  return totalAmt;
};

export class PayGateConnector {
  gateWayName: string = "PayGate_V2";
  errorMsg: string = "Transaction not found";

  wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  fetchTransaction = async (id: string): Promise<PaymentData[]> => {
    console.log("Fetching transaction....");
    await this.wait(800);
    if (id.startsWith("ERR_")) {
      throw new Error(this.errorMsg);
    }
    return [{ transactionId: id, amount: 200000, status: "SUCCESS" }];
  };
}
    