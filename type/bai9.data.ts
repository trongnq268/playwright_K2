interface form_data {
  email:string,
  password:string,
}
const generateEmail = (): string => 
    `${Array.from({length: 6}, () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]).join('')}${Date.now()}@gmail.com`;

export const Data_account: form_data[] =  [
  // data đã được tạo trước đó
    {  
        email: 'nguyenducan03@gmail.com',
        password: 'b2345678',
        
    },
    {  
        email: generateEmail(),
        password: 'b2345678',
        
    }
   
];
// config so luong
export const quanlity : number  = 4;
export const product_ID : number  = 1;
export const number : number  = 0;
export const Card =  [
  // data đã được tạo trước đó
    {  
        name_of_card: 'Nguyen Duc An',
        card_number: '1234567890123456',
        cvc: '123',
        expiration_month: '12',
        expiration_year: '2030',
    }
  ]