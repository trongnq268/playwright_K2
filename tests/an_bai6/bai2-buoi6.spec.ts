import { test, expect } from '@playwright/test';

interface TestCase {
    id: string;
    name: string;
    passed: boolean;
    duration: number;
}
const wait = (ms: number): Promise<void> => {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
};

test('bai_2', async () => {
const test_case : TestCase[] = [
    {
        id: '001',
        name: 'Login',
        passed: true,
        duration: 100
    },
    {
        id: '002',
        name: 'Logout',
        passed: true,
        duration: 100
    },
    {
        id: '003',
        name: 'Payment',
        passed: true,
        duration: 700
    },
    {
        id: '004',
        name: 'Refund',
        passed: false,
        duration: 100
    },
    {
        id: '005',
        name: 'QR Payment',
        passed: true,
        duration: 500
    },
    {
        id: '006',
        name: 'Register',
        passed: true,
        duration: 200
    },
    {
        id: '007',
        name: 'Change Password',
        passed: false,
        duration: 100
    },
    {
        id: '008',
        name: 'Profile',
        passed: false,
        duration: 100
    },
]



const check_test_case_pass = (): number => {
    let passed_count: number = 0;
    for (const test_pass of test_case) {
        if (test_pass.passed === true) {
            passed_count++;
        }
    }
    return passed_count;
}

const test_case_pass: number = check_test_case_pass();
console.log(`so test case pass la ${test_case_pass}`)

const check_test_case_failed = (): number => {
    let faild_count : number = 0;
    for (const test_failed of test_case ){
        if (test_failed.passed === false){
            faild_count++;
        }
    }
    return faild_count;
}

const test_case_failed: number = check_test_case_failed();
console.log(`so test case faile la ${test_case_failed}`)


const time_count = (): number =>{
    let tong_thoi_gian : number = 0;
    for (const test_time of test_case) {
        tong_thoi_gian += test_time.duration;
    }
    return tong_thoi_gian;
}

const check_time :number  = time_count();
console.log(`tong thoi gian chay test case la ${check_time}`)

const long_time = (): number =>{
    let test_case_lau_nhat : number = 0;
    for (const lau_nhat of test_case){
        if (lau_nhat.duration > test_case_lau_nhat){
            test_case_lau_nhat = lau_nhat.duration
        }
    }
    return test_case_lau_nhat;
}
const thoi_gian_lau_nhat: number = long_time();
console.log(`test case co thoi gian chay lau nhat la ${thoi_gian_lau_nhat}`)


const tat_ca_cac_test_case_failed: TestCase[] = [];

let so_test_case_false: number = 0;
for (const check_failed of test_case) {
    if (check_failed.passed === false) {
        tat_ca_cac_test_case_failed.push(check_failed);
        so_test_case_false++;
    }
}
// console.log(`tat ca cac test case faile co id la ${tat_ca_cac_test_case_failed.map(test => test.id)}`);
// console.log(`so test case faile la ${so_test_case_false}`);
expect(tat_ca_cac_test_case_failed.length).toBe(test_case_failed);



});