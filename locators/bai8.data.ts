interface form_data {
  email:string,
  password:string,
}

// tao email dang ky
const generateEmail = (): string => 
    `${Array.from({length: 6}, () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]).join('')}${Date.now()}@gmail.com`;
//tao mat khau dang ki
const Password = (): string => 
    `${Array.from({length: 4}, () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]).join('')}${Array.from({length: 4}, () => Math.floor(Math.random() * 10)).join('')}`;


    
export const Data_account: form_data[] =  [
  //test case 1 - user dang ky moi
    {
      email: generateEmail(),
      password: Password(),
      
    },
    // test case 2 - user da dang ky (account duoi da duoc dang ky truoc do)
    // su dung bo data nay cho test casse 3
    {  
        email: 'nguyenducan03@gmail.com',
        password: 'b2345678',
        
    },
    {
      // test case 3 - tai khoang co mat khau sai
      email: 'nguyenducan04@gmail.com',
      password: 'c3456789'
    }
];