import { test } from "@playwright/test";

import {
    PaymentData,
    calculateTotalAmount,
    PayGateConnector
} from "../helpers/paymentHelper";

test("Đối soát PayGate", async () => {

    const connector = new PayGateConnector();

    // Danh sách giao dịch
    const payments: PaymentData[] = [
        {
            transactionId: "001",
            amount: 100000,
            status: "SUCCESS",
            fee: 3000
        },
        {
            transactionId: "002",
            amount: 200000,
            status: "SUCCESS"
        },
        {
            transactionId: "003",
            amount: 150000,
            status: "PENDING",
            fee: 2000
        }
    ];

    // Tính tổng tiền
    const total = calculateTotalAmount(payments);

    console.log("===== TỔNG TIỀN =====");
    console.log(total);

    // API thành công
    try {

        const transaction = await connector.fetchTransaction("999");

        console.log("\n===== GIAO DỊCH THÀNH CÔNG =====");
        console.log(transaction);

    } catch (error) {

        console.log(error);

    }

    // API lỗi
    try {

        const transaction = await connector.fetchTransaction("ERR_404");

        console.log(transaction);

    } catch (error: any) {

        console.log("\n===== LỖI =====");
        console.log(error.message);

    }

});