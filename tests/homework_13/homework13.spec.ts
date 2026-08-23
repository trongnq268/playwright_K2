import {test, expect} from '@playwright/test';
import {GuestInfo} from '../../pages/homwork13_page/guestInfo.page';

test.describe('BÀI TẬP TỔNG HỢP: TYPESCRIPT CLASS & PLAYWRIGHT POM', async() =>{
    test('Bài 1', async() =>{
        const guest = new GuestInfo(
            'Nhung',
            'Nguyen',
            'nhnhung@gmail.com',
            '098765321',
        )
        const fullName = guest.getFullName();
        console.log(fullName);

    })
});