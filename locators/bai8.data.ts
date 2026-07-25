interface form_data {
  email:string,
  password:string,
  
  
}

export const Data_account: form_data[] =  [
  //test case 1 - user dang ky moi
    {
      email: 'nguyenducan@gmail.com',
      password: 'a1234567',
      
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