import { test, expect } from '@playwright/test';

const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

interface Order {
    id: string;
    customer: string;
    total: number;
    status: string;
};

interface RevenueResult {
    revenue: number;
    countOrderCompleted: number;
};

test('Bài 3. Quản lý đơn hàng (Object + Async/Await)', async () => {
    const orderList: Order[] = [
        { id: 'DH001', customer: 'Phạm Ánh Tuyết', total: 1500000, status: 'Completed' },
        { id: 'DH002', customer: 'Trần Văn Ánh', total: 2500000, status: 'Pending' },
        { id: 'DH003', customer: 'Nguyễn Văn Nam', total: 7800000, status: 'Failed' },
        { id: 'DH004', customer: 'Ngô Khánh Ngọc', total: 5000000, status: 'Completed' },
        { id: 'DH005', customer: 'Trịnh Thùy Linh', total: 3500000, status: 'Completed' },
    ];

    // --------- TÍNH TỔNG DOANH THU & ĐẾM SỐ ĐƠN HÀNG COMPLETED ---------
    const totalRevenue = (orderList: Order[]): RevenueResult => {
        let revenue = 0;
        let countOrderCompleted = 0;
        for (let i = 0; i < orderList.length; i++) {
            // Tính tổng doanh thu
            revenue += orderList[i].total;

            // Đếm số đơn hàng Completed
            if (orderList[i].status === 'Completed') {
                countOrderCompleted++;
            }
        }
        return { revenue, countOrderCompleted };
    };

    const main = async (): Promise<RevenueResult> => {
        console.log('1. Đang tải danh sách đơn hàng ...');
        await wait(2000); // Chờ 2 giây
        console.log('2. Đã tải xong danh sách!');
        console.log(orderList);

        const result = totalRevenue(orderList);
        console.log(`Tổng doanh thu: ${result.revenue.toLocaleString("vi-VN")} VNĐ`); // In ra tổng doanh thu
        console.log(`Số đơn hàng Completed: ${result.countOrderCompleted} đơn`); // In ra số đơn hàng Completed

        return totalRevenue(orderList);
    };

    const result = await main();
    expect(result.revenue).toEqual(20300000); // Verify result => Tổng doanh thu là 20tr300k
    expect(result.countOrderCompleted).toEqual(3); // Verify result => Số đơn hàng Completed là 3
});