// helpers/paymentHelper.ts
export type PaymentData = {
  transactionId: string;
  amount: number;
  status: string;
  fee?: number; 
};

// Định nghĩa arrow function và export
export const calculateTotalAmount = (payment: PaymentData[] ): number => {
  let totalAmount = 0;
  for (let total of payment){
    if(total.fee === undefined){
      totalAmount += total.amount + (total.amount*0.011);
    }else{
      totalAmount += total.amount + total.fee;
    }
  }
  return totalAmount;
};








