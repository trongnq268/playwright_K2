export interface Testcase {
  id: string;
  name: string;
  passed: boolean;
  duration: number;
}

export const failedTcs: string[] = [];

export const countTestPassed = (testcases: Testcase[]): number => {
  let countPass: number = 0;
  for (const tc of testcases) {
    if (tc.passed === true) {
      countPass++;
    }
  }
  return countPass;
};

export const countTestFailed = (testcases: Testcase[]): number => {
  let countFail: number = 0;
  for (const tc of testcases) {
    if (tc.passed === false) {
      countFail++;
      failedTcs.push(tc.name);
    }
  }
  return countFail;
};

export const calculateTotalDuration = (testcases: Testcase[]): number => {
  let totalDuration: number = 0;
  for (const tc of testcases) {
    totalDuration += tc.duration;
  }
  return totalDuration;
};

export const findMaxDurationTc = (tcList: Testcase[]): string => {
  let maxDurationTc = {
    name: tcList[0].name,
    duration: tcList[0].duration
  };

  for (const tc of tcList) {
    if (tc.duration > maxDurationTc.duration) {
      maxDurationTc = {
        name: tc.name,
        duration: tc.duration
      }
    }
  }
  return maxDurationTc.name;
};
