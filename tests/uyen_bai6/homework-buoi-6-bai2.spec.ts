import { test, expect } from '@playwright/test';

interface TestCase {
    id: string;
    name: string;
    passed: boolean;
    duration: number;
};

test('Bài 2. Quản lý kết quả chạy Automation Test', async () => {
    const testcase: TestCase[] = [
        { id: 'TC001', name: 'Login', passed: true, duration: 15 },
        { id: 'TC002', name: 'Logout', passed: false, duration: 3 },
        { id: 'TC003', name: 'Payment', passed: true, duration: 30 },
        { id: 'TC004', name: 'Refund', passed: false, duration: 25 },
        { id: 'TC005', name: 'QR Payment', passed: true, duration: 60 },
        { id: 'TC006', name: 'Register', passed: false, duration: 15 },
        { id: 'TC007', name: 'Change Password', passed: true, duration: 10 },
        { id: 'TC008', name: 'Profile', passed: true, duration: 20 },
    ];

    // --------- ĐẾM SỐ TEST PASSED, FAILED & TẠO MẢNG CHỈ CHỨA TÊN CÁC TEST FALED ---------
    const failedTestName: string[] = [];
    const countTestResult = (testcase: TestCase[]) => {
        let testPassed = 0;
        let testFailed = 0;

        for (let i = 0; i < testcase.length; i++) {
            // Đếm test PASSED
            if (testcase[i].passed === true) {
                testPassed++;
            }
            // Đếm test FAILED
            else {
                testFailed++;
                failedTestName.push(testcase[i].name);
            }
        }
        return { testPassed, testFailed }
    };

    const result = countTestResult(testcase);
    console.log(`Số test passed: ${result.testPassed}`);
    console.log(`Số test failed: ${result.testFailed}`);
    console.log('Mảng chứa tên các test failed:');
    console.log(failedTestName);

    // Verify KQ trả về đúng mong đợi 
    // --- PASSED = 5, FAILED = 3
    expect(result.testPassed).toEqual(5);
    expect(result.testFailed).toEqual(3);
    // --- Mảng chứa tên các test failed là ['Logout', 'Refund', 'Register']
    expect(failedTestName).toEqual(['Logout', 'Refund', 'Register']);

    // --------- TÍNH TỔNG THỜI GIAN CHẠY TEST & TÌM TEST CHẠY LÂU NHẤT ---------
    const getTestSummary = (testcase: TestCase[]) => {
        let totalDuration = 0;
        let maxTest = testcase[0];

        for (let i = 0; i < testcase.length; i++) {
            // Tính tổng thời gian chạy test
            totalDuration += testcase[i].duration;

            // Tìm test chạy lâu nhất
            if (testcase[i].duration > maxTest.duration) {
                maxTest = testcase[i];
            }
        }
        return { totalDuration, maxTest };
    };

    const resultGetTestSummary = getTestSummary(testcase);
    console.log(`Tổng thời gian chạy test: ${resultGetTestSummary.totalDuration} phút`);
    console.log(`Test chạy lâu nhất: ${resultGetTestSummary.maxTest.id} - ${resultGetTestSummary.maxTest.name} - ${resultGetTestSummary.maxTest.duration} phút`);

    // Verify KQ trả về đúng mong đợi 
    // ---- Tổng thời gian chạy test: 178m
    expect(resultGetTestSummary.totalDuration).toEqual(178);
    // ---- Testcase chạy lâu nhất có ID: TC005, Name: QR Payment, Thời gian: 60 phút
    expect(resultGetTestSummary.maxTest.id).toBe('TC005');
    expect(resultGetTestSummary.maxTest.name).toBe('QR Payment');
    expect(resultGetTestSummary.maxTest.duration).toEqual(60);

})