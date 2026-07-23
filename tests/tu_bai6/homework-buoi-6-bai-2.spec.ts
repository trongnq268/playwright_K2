import { test, expect } from "@playwright/test";
import {
  Testcase,
  failedTcs,
  countTestFailed,
  countTestPassed,
  calculateTotalDuration,
  findMaxDurationTc,
} from "../../helpers/testcaseHelper";

test("Test cases Management", async () => {
  const testcases: Testcase[] = [
    {
      id: "TC-01",
      name: "Login",
      passed: true,
      duration: 1000,
    },
    {
      id: "TC-02",
      name: "Logout",
      passed: true,
      duration: 1000,
    },
    {
      id: "TC-03",
      name: "Payment",
      passed: true,
      duration: 5000,
    },
    {
      id: "TC-04",
      name: "Refund",
      passed: false,
      duration: 7500,
    },
    {
      id: "TC-05",
      name: "QR Payment",
      passed: true,
      duration: 3000,
    },
    {
      id: "TC-06",
      name: "Register",
      passed: true,
      duration: 1000,
    },
    {
      id: "TC-07",
      name: "Change Password",
      passed: false,
      duration: 1500,
    },
    {
      id: "TC-08",
      name: "Profile",
      passed: false,
      duration: 2100,
    },
  ];

  const numberTcPass = countTestPassed(testcases);
  const numberTcFail = countTestFailed(testcases);
  const maxDurationTc = findMaxDurationTc(testcases);
  const totalDuration = calculateTotalDuration(testcases);

  console.log(`Number of passed tcs: ${numberTcPass}`);
  console.log(`Number of failed tcs: ${numberTcFail}`);
  console.log(`Total running duration: ${totalDuration} ms`);
  console.log(`Test case with highest duration: ${maxDurationTc}`);
  console.log(`List of failed tcs: ${failedTcs}`);

  expect(numberTcPass).toBe(5);
  expect(numberTcFail).toBe(3);
  expect(totalDuration).toBe(22100);
  expect(maxDurationTc).toBe("Refund");
  expect(failedTcs).toEqual(["Refund", "Change Password", "Profile"]);
});
