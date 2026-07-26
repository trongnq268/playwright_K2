import { test, expect } from '@playwright/test';

test('info', async () => {
    // neeus theem page vaafo async thif khi chajy mawjc ddinhj sex mowr trinhf duyet
    const name: string = "Thu";
    const birthDay: string = "02/02/2001";
    const sex: string = "Female";
    const testExperient: number = 3;

    console.log(name);
    console.log(birthDay);
    console.log(sex);
    console.log(testExperient);
    expect(testExperient).toBe(3);
    expect(testExperient).toBe(3);

    console.log("Ten toi la: ", name);

    const soLuong: number = 2;
    const giaTien: number = 1500;
    const total: number = soLuong*giaTien;
    console.log(total);

});