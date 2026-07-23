// helpers/paymentHelper.ts

// Yêu cầu 1.1: type PaymentData
// status để union type cho chặt chẽ (production-grade), nhưng nếu đề chỉ cần
// string thì thay bằng: status: string;
export type PaymentData = {
  transactionId: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  fee?: number; // optional
};

// Yêu cầu 1.2: calculateTotalAmount dạng Arrow Function + reduce rút gọn tối đa
// Mỗi giao dịch = amount + phí. Có fee -> dùng fee; không có -> 1.1% của amount.
// Dùng ?? thay vì || để tránh bug khi fee = 0 (fee hợp lệ nhưng || sẽ bỏ qua).
export const calculateTotalAmount = (transactions: PaymentData[]): number =>
  transactions.reduce(
    (total, { amount, fee }) => total + amount + (fee ?? amount * 0.011),
    0
  );

// export const calculateTotalAmount = (transactions: PaymentData[]): number => {
//   let total = 0;

//   for (const trans of transactions) {
//     let fee: number;

//     // Xác định phí dịch vụ cho từng giao dịch
//     if (trans.fee !== undefined && trans.fee !== null) {
//       fee = trans.fee;            // Giao dịch đã có sẵn phí -> dùng phí đó (kể cả fee = 0)
//     } else {
//       fee = trans.amount * 0.011; // Không có phí -> tính mặc định 1.1% của amount
//     }

//     // Cộng dồn: tiền giao dịch + phí dịch vụ
//     total += trans.amount + fee;
//   }

//   return total;
// };

// Yêu cầu 1.3: Class PayGateConnector giả lập gọi API bất đồng bộ
export class PayGateConnector {
  gatewayName: string = "PayGate_V2";

  // Helper trì hoãn, trả về Promise<void>
  private wait = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // fetchTransaction là Arrow Function để "mượn" this của instance,
  // nhờ đó truy cập this.gatewayName an toàn kể cả khi bị destructure/gọi tách rời.
  // Trả về Promise<PaymentData> (một object, KHÔNG phải mảng).
  fetchTransaction = async (id: string): Promise<PaymentData> => {
    console.log(`[${this.gatewayName}] Fetching transaction: ${id} ...`);
    await this.wait(800);

    if (id.startsWith("ERR_")) {
      throw new Error("Transaction not found");
    }

    return { transactionId: id, amount: 200000, status: "SUCCESS" };
  };
}
