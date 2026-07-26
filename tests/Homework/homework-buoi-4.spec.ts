import { test, expect } from '@playwright/test';

test('Bang cuu chuong 5', async () => {
    let i :number;
    console.log("Bang cuu chuong cua so 5 la:");
    for(i=1; i<=10; i++){
        if(i*5){
            let ketqua: number = 5*i;
            console.log(`5 x ${i} = ${ketqua}`);
        }
    }
    
});

test('Bien dong so du', async () => {
    let balance: number = 5000000;
    let i:number;
    for (i = 1; i <=12; i++){
        if(i % 3 === 0 ){
        balance = balance + 3000000;
        console.log("Thang hien tai: ", i);
        console.log("Loai giao dich: Nap tien");
        console.log("So tien giao dich: 3000000");
        console.log("So du sau khi giao dich: ", balance);
        console.log("---------------");
        }
        else if (i%2 ===0){
        balance = balance - 1500000;
        console.log("Thang hien tai: ", i);
        console.log("Loai giao dich: Rut tien");
        console.log("So tien giao dich: 1500000");
        console.log("So du sau khi giao dich: ", balance);
        console.log("---------------");
        }
        else{
        balance = balance - 500000;
        console.log("Thang hien tai: ", i);
        console.log("So tien giao dich: Rut tien");
        console.log("So tien giao dich: 500000");
        console.log("So du sau khi giao dich: ", balance);  
        console.log("---------------");
        }
        if (i===12){
            console.log("=================");
            console.log("BAO CAO CUOI NAM");
            console.log("So du cuoi nam: ",balance);
            console.log("=================");
        }
            }


});