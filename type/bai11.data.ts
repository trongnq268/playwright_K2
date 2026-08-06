
import { Page } from '@playwright/test';


const characters = (): string => 
    `${Array.from({length: 6}, () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]).join('')}${Date.now()}`;


export const info_guest =  [
  // thong tin khach hang thong thuong
    {  
        Firt_name: 'Nguyen',
        Last_name: 'Duc An',
        Email: 'nguyenvana_test@gmail.com',
        Phone: '09123456789',
    },
    {// thong tin khach hang co firt name 3 ki tu
        Firt_name: 'ABC',
        Last_name: 'Duc An',
        Email: 'nguyenvana_test@gmail.com',
        Phone: '09123456789',
    },
    {// thong tin khach hang co firt name 2 ki tu
        Firt_name: 'AN',
        Last_name: 'Duc An',
        Email: 'nguyenvana_test@gmail.com',
        Phone: '09123456789',
    },
    {// thong tin khach hang co firt name 18 ki tu
        Firt_name: 'NguyenDucAn1234567',
        Last_name: 'Duc An',
        Email: 'nguyenvana_test@gmail.com',
        Phone: '09123456789',
    },
    {// thong tin khach hang co firt name 19(>18) ki tu
        Firt_name: 'NguyenDucAn12345678',
        Last_name: 'Duc An',
        Email: 'nguyenvana_test@gmail.com',
        Phone: '09123456789',
    },
    {// email sai dinh dang (khong co dau @)
        Firt_name: 'NguyenDucAn12345678',
        Last_name: 'Duc An',
        Email: 'nguyenvana_testgmail.com',
        Phone: '09123456789',
    },
    {// so dien thoai co ki tu khong phai la so
        Firt_name: 'Nguyen',
        Last_name: 'Duc An',
        Email: 'nguyenvana_test@gmail.com',
        Phone: '0912a',
    },
    {// so dien thoai thieu ki tu (10 ki tu)
        Firt_name: 'Nguyen',
        Last_name: 'Duc An',
        Email: 'nguyenvana_test@gmail.com',
        Phone: '0123456789',
    },
    {// so dien thoai thieu ki tu (10 ki tu)
        characters: characters(),
    },

    

  ]

export const time =  [
  // dien thoi gian, phai diền đúng định dạng
    {  
        start_day: '2026-08-05',
        end_day: '2026-08-06',
       
    }]

