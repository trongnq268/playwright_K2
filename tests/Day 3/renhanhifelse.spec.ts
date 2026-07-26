import { test, expect } from '@playwright/test';

test('has title', async () => {
    let thoiTietHomNay: string = "troi mua";
    if(thoiTietHomNay === "troi mua"){
        console.log("Toi can dem theo o");
    }else if(thoiTietHomNay === "nang"){
        console.log("Toi can mang kinh dam");
    }else{
        console.log("Du bao sai roi")
    }
});


test('Xep loai hoc sinh', async () => {
    let score: number = 85;
    
    if(score >= 90 ){
        console.log("Xep loai xuat sac");
    }else if(score >= 70){
        console.log("Xep loai kha");
    }else{
        console.log("Can co gang")
    }
});

test('BMI', async () => {
    let canNang: number = 43;
    let chieuCao: number = 1.6;
    let BMI: number = canNang / (chieuCao*chieuCao);

    if(BMI < 18.5 ){
        console.log("Thieu can");
    }else if(BMI < 25){
        console.log("Binh thuong");
    }else if(BMI < 30) {
        console.log("Thua can");
    } else{
        console.log("Beo phi");
    }

});