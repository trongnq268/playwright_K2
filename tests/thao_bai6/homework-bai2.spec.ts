import { test, expect } from "@playwright/test";
interface TestCase {
  id: string;
  name: string;
  passed: boolean;
  duration: number;
}

test("Bai 2", async () => {
  const testCases: TestCase[] = [
    { id: "TC01", name: "Login", passed: true, duration: 3 },
    { id: "TC02", name: "Logout", passed: true, duration: 2 },
    { id: "TC03", name: "Payment", passed: false, duration: 8 },
    { id: "TC04", name: "Refund", passed: true, duration: 5 },
    { id: "TC05", name: "QR Payment", passed: false, duration: 6 },
    { id: "TC06", name: "Register", passed: true, duration: 4 },
    { id: "TC07", name: "Change Password", passed: true, duration: 7 },
    { id: "TC08", name: "Profile", passed: false, duration: 3 },
  ];

  //Đếm Passed
  const countPassed = (): number => {
    let count = 0;
    for (const testCase of testCases) {
      if (testCase.passed) {
        count++;
      }
    }
    return count;
  };

  //Đếm Failed
  const countFailed = (): number => {
    let count = 0;
    for (const testCase of testCases) {
      if (testCase.passed === false) {
        count++;
      }
    }
    return count;
  };

  //Tổng thời gian chạy test
  const calculateTotalRunTime = (): number => {
    let total = 0;
    for (const testCase of testCases) {
      total += testCase.duration;
    }
    return total;
  };

  //Test case chạy lâu nhất
  const findLongestTest = (): TestCase => {
    let longest = testCases[0];
    for (const testCase of testCases) {
      if (testCase.duration > longest.duration) {
        longest = testCase;
      }
    }
    return longest;
  };

  //Danh sách test failed
  const getFailedTests = (): string[] => {
    let failedTests: string[] = [];
    for (const testCase of testCases) {
      if (testCase.passed === false) {
        failedTests.push(testCase.name);
      }
    }
    return failedTests;
  };

  const passedCount = countPassed();
  const failedCount = countFailed();
  const totalDuration = calculateTotalRunTime();
  const longestTest = findLongestTest();
  const failedTests = getFailedTests();

  console.log(`Passed: ${passedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log(`Total Duration: ${totalDuration}s`);
  console.log(`Longest Test: ${longestTest.name}, (${longestTest.duration}s)`);
  console.log(`Failed Tests: ${failedTests.join(", ")}`);

  // Verify
  expect(passedCount).toBe(5);
  expect(failedCount).toBe(3);
  expect(totalDuration).toBe(38);
  expect(longestTest.name).toBe("Payment");
  expect(failedTests).toEqual(["Payment", "QR Payment", "Profile"]);
});
