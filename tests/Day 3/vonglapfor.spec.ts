import { test, expect } from '@playwright/test';

test('has title', async () => {
    for (let i =1; i <=10; i++){
        console.log(i);
    }
});
// Chajy caua leenhj cho ddeens khi dat nguowngx ddieu kien
test('has title 2', async () => {
    let i: number = 1;
    for (i; i <=10; i++){
        console.log(i);
    }
});

test('has title 3', async () => {
    let i: number;
    for (i = 1; i <=10; i++){
        if(i===5){
        console.log(i);
        }
    }
});

test('Tim so chan', async () => {
    let i: number;
    for (i = 1; i <=10; i++){
        if(i%2 ===0){
        console.log(i);
        }
    }
});



test('Dau backtick', async () => {
    let i: number;
    for (i = 1; i <=10; i++){
        if(i%2 ===0){
        console.log(i);
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
        }
        else if (i%2 ===0){
        balance = balance - 1500000;
        console.log("Thang hien tai: ", i);
        console.log("Loai giao dich: rut tien");
        console.log("So tien giao dich: Rut tien");
        console.log("So du sau khi giao dich: ", balance);
        }
        else{
        balance = balance - 500000;
        console.log("Thang hien tai: ", i);
        console.log("So tien giao dich: Rut tien");
        console.log("So tien giao dich: 500000");
        console.log("So du sau khi giao dich: ", balance);  
        }
        if (i===12){
            console.log("=================");
            console.log("BAO CAO CUOI NAM");
            console.log("So du cuoi nam: ",balance);
        }
            }


});

