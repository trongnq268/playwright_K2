import { test, expect } from '@playwright/test';
// import { array } from 'node:stream/iter';

interface TestCase {
    id: string;
    name: string;
    passed: boolean;
    duration: number;
}

test('Bài 2 -  Quản lý kết quả chạy Automation Test', async() =>{
    // Tạo 8 test cases
    const testCases: TestCase[] = [
        {   id: 'TC01', name: 'Login', passed: true, duration: 6    },
        {   id: 'TC02', name: 'Logout', passed: false, duration: 3    },
        {   id: 'TC03', name: 'Payment', passed: true, duration: 4    },
        {   id: 'TC04', name: 'Refund', passed: true, duration: 9    },
        {   id: 'TC05', name: 'QR payment', passed: false, duration: 2    },
        {   id: 'TC06', name: 'Register', passed: true, duration: 5    },
        {   id: 'TC07', name: 'Change password', passed: true, duration: 3    },
        {   id: 'TC08', name: 'Profile', passed: false, duration: 4    }
    ];
    // Func 1 - đếm số test case Pass
    const countPass = (testCase: TestCase[]): number =>{
        let count = 0;
        for( const pass of testCase){
            if(pass.passed === true) count++;
        }
        return count;
    }
    console.log(`Số lượng test case Passed là: ${countPass(testCases)}`);
    // Func 2 - đếm số test case Failed
    const countFail = (testCase: TestCase[]): number =>{
        let count = 0;
        for( const fail of testCase){
            if(fail.passed === false) count++;
        }
        return count;
    }
    console.log(`Số lượng test case Failed là: ${countFail(testCases)}`);
    // Func 3 - Tính tổng thời gian chạy test
    const totalDuration = (testCase: TestCase[]): number =>{
        let sum = 0;
        for( const total of testCase){
            sum += total.duration;
        }
        return sum;
    }
    console.log(`Tổng thời gian chạy test là: ${totalDuration(testCases)}`);
    // Func 4 - Tìm test chạy lâu nhất
    const maxDuration = (testCase: TestCase[]): number =>{
        let max = testCase[0].duration;
        for( const total of testCase){
            if( max < total.duration) max = total.duration;
        }
        return max;
    }
    const maxDur = maxDuration(testCases)
    for( const findTestMax of testCases){
        if (maxDur === findTestMax.duration) console.log(`Test case ${findTestMax.id} có thời gian chạy test lâu nhất là: ${findTestMax.duration}`);
    }
    // Func 5 - Tạo mảng chỉ chứa tên các test failed
    const findArrayFailed = (testCase: TestCase[]): string[] => {
        const arrayFailed: string[] = [];
        for(const findFailed of testCase){
            if (findFailed.passed === false){
                arrayFailed.push(findFailed.name);
            }
        }
        return arrayFailed;
    }
    console.log('Danh sách tên các test case Failed:');
    console.log(findArrayFailed(testCases));
    // Kiểm tra bằng expect:
    expect(countPass(testCases)).toEqual(5);
    expect(countFail(testCases)).toEqual(3);
    expect(totalDuration(testCases)).toEqual(36);
    expect(maxDur).toEqual(9);
    expect(findArrayFailed(testCases)).toEqual(['Logout', 'QR payment', 'Profile']);
});