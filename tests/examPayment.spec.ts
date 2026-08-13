// tests/payment.spec.ts
import { test } from "@playwright/test";
import {
  calculateTotalAmount,
  PayGateConnector,
  PaymentData,
} from "../helpers/examPaymentHelper";

test("PayGate - tính tổng tiền và fetch transaction (thành công + lỗi)", async () => {
  // --- Phần 1: calculateTotalAmount ---
  const transactions: PaymentData[] = [
    { transactionId: "pos101566", amount: 25600, status: "SUCCESS", fee: 5000 },
    { transactionId: "pos101569", amount: 500600, status: "PENDING" }, // không có fee -> tính 1.1%
    { transactionId: "pos101666", amount: 885000, status: "FAILED", fee: 52000 },
    { transactionId: "pos101766", amount: 125000, status: "SUCCESS" },
    { transactionId: "pos101564", amount: 280600, status: "SUCCESS", fee: 40000 },
  ];

  const totalTransAmt = calculateTotalAmount(transactions);
  console.log(`Tổng tiền thực tế phải trả: ${totalTransAmt}`);

  // --- Phần 2: PayGateConnector ---
  const connector = new PayGateConnector();

  // 2a. Gọi với ID HỢP LỆ, dùng async/await đúng cách.
  // Lưu ý: tham số là transactionId (không phải tên gateway).
  const validResult = await connector.fetchTransaction("pos101566");
  console.log("Kết quả hợp lệ:", validResult);

  // 2b. Gọi với ID LỖI (ERR_404) và bắt lỗi bất đồng bộ bằng try/catch.
  try {
    const errorResult = await connector.fetchTransaction("ERR_404");
    console.log("Kết quả (không nên tới đây):", errorResult);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log("Bắt được lỗi:", message);
  }

  // --- Trả lời câu hỏi lý thuyết: nếu QUÊN await? ---
  // fetchTransaction là async nên luôn trả về một Promise.
  // Nếu quên await, biến sẽ giữ Promise đang pending, console.log in ra
  // "Promise { <pending> }" thay vì dữ liệu thật. Ngoài ra, lỗi reject
  // KHÔNG được try/catch bắt (vì catch chỉ chặn Promise đã được await),
  // dẫn tới UnhandledPromiseRejection. Ví dụ minh họa:
  const pendingPromise = connector.fetchTransaction("pos999"); // thiếu await
  console.log("Khi thiếu await:", pendingPromise); // -> Promise { <pending> }
  await pendingPromise; // await lại để tránh unhandled rejection trong demo
});
