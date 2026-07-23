export type PaymentData = {
  transactionId: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  fee?: number;
};

export const calculateTotalAmount = (payments: PaymentData[]): number => 
    payments.reduce((total, payment) => 
        total + payment.amount + (payment.fee ?? payment.amount * 0.011), 0
);

export class PayGateConnector {

    gatewayName: string = "PayGate_V2";

    fetchTransaction = (id: string): Promise<PaymentData> => {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                if (id.startsWith("ERR_")) {
                    reject(new Error("Transaction not found"));
                } else {
                    resolve({
                        transactionId: id,
                        amount: 200000,
                        status: "SUCCESS"
                    });
                }

            }, 800);

        });

    };

}

