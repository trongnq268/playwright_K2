import { test, expect } from '@playwright/test';

test('object', async () => {
   // Khai baos object tuong tu nhu 1 bien
   // Cacs thoong tin trong 1 object cos theer trung nhau
   // ten: key     "Nguy Van A" : value
   // Object thuowngf dungf ddeer khowi tajo data test. Neen data tests han che thay ddoi => vif thees nen dungf const
    const users = {
        ten: "Nguyen Van A",
        tuoi: 26
    }
    const thongTinCaNhan ={
        ten: "Thu",
        tuoi: 25,
        email: "abc@gmail.com",
        kinhNghiem: 3,
    }
    console.log("Thong tin ca nhan cua ban than:");
    console.log(`Ten: ${thongTinCaNhan.ten}`);
    console.log(`Email: ${thongTinCaNhan.email}`);
    
});

test('Demo 2: Duyệt danh sách test case dạng object', async () => {
  const testCases = [
    { name: 'Login', passed: true },
    { name: 'Logout', passed: true },
    { name: 'SignUp', passed: false },
  ];
  const failedTests: string[] = [];  // Khai baos 1 bien dder ddeems

  for (const testCase of testCases) { // chajy for trong mangr
    if (testCase.passed === false) {
      failedTests.push(testCase.name); // Theem gias trij vafo bien
      console.log(`Test bị fail: ${testCase.name}`);
    }
  }

  expect(failedTests).toEqual(['SignUp']);
});

test('Luong nhan vien', async () => {
    const hoaDon =[
        {
            id: "001",
            customer: "An",
            total: 500,
            paid: true,
        },
         {
            id: "002",
            customer: "Binh",
            total: 2200,
            paid: false,
        }, {
            id: "003",
            customer: "Lan",
            total: 1200,
            paid: true,
        }, {
            id: "004",
            customer: "Nan",
            total: 3500,
            paid: false,
        }, {
            id: "005",
            customer: "Mai",
            total: 800,
            paid: true,
        }, {
            id: "006",
            customer: "Linhn",
            total: 4200,
            paid: false,
        },
    ];
    const unpaid: string[] =[];
    
    
    for(const thanhToan of hoaDon){

        if(thanhToan.paid === false){
            unpaid.push(thanhToan.id)
            console.log(`Hoa don chua thanh toan la ${thanhToan.id}`)
        };
    };
    let tongDoanhThu : number = 0;
    let chuaThanhToan: number =0;
    let daThanhToan: number =0;
    
    for(const thanhToan of hoaDon){
        tongDoanhThu = tongDoanhThu + thanhToan.total; 
        if(thanhToan.paid == true){
            daThanhToan = daThanhToan + thanhToan.total;            
        } else {
            chuaThanhToan = chuaThanhToan + thanhToan.total;
        }
        }
        console.log(`Tong doanh thu = ${tongDoanhThu}`);
        console.log(`Chua thanh toan = ${chuaThanhToan}`);
        console.log(`Da thanh toan = ${daThanhToan}`);
    
        let max = hoaDon[0];
        for(const thanhToan of hoaDon){
            if(thanhToan.total > max.total){
                max = thanhToan;
            }
        }
        console.log(`Đơn hàng lớn nhất là của ${max.customer} với số tiền ${max.total}` );

});

// test('Thực hành - buổi 6', async() => {
//     const orderList = [
//         {  id: 'O01', customer: 'An', total: 500, paid: true },
//         {  id: 'O02', customer: 'Bình', total: 2200, paid: false },
//         {  id: 'O03', customer: 'Lan', total: 1200, paid: true },
//         {  id: 'O04', customer: 'Nam', total: 3500, paid: false },
//         {  id: 'O05', customer: 'Mai', total: 800, paid: true },
//         {  id: 'O06', customer: 'Linh', total: 4200, paid: false },
//     ];
//     // in các đơn chưa thanh toán
//     console.log('---Các đơn hàng chưa thanh toán---');
//     let totalRevenue = 0;
//     let unpaid = 0;
//     let paid = 0;
//     let max = 0;
//     for (const printOrder of orderList){
//         totalRevenue += printOrder.total;
//         if (printOrder.paid === false ){
//             console.log(`Đơn hàng ${printOrder.id}`);
//             unpaid += printOrder.total;
//         }
//         if (printOrder.paid === true ){
//             console.log(`Đơn hàng ${printOrder.id}`);
//             paid += printOrder.total;
//         }
//         if( max < printOrder.total) max = printOrder.total;
        
//     }
    
//     // Tổng doanh thu
//     console.log(`Tổng doanh thu tất cả đơn hàng là: ${totalRevenue}`);
//     console.log(`Tổng doanh thu chưa thanh toán là: ${unpaid}`);
//     console.log(`Tổng doanh thu đã thanh toán là: ${paid}`);
    

//     for (const checkMax of orderList){
//         if( max === checkMax.total){
//             console.log(`Đơn hàng có giá trị lớn nhất là: ${checkMax.id}`);
//         }
//     }
// });

// //In hoa don chua thanh toan --- Bafi cuar Thaor
//     const bills = [
//         { id: "O01", customer: "An", total: 500, paid: true },
//         { id: "O02", customer: "Binh", total: 2200, paid: false },
//         { id: "O03", customer: "Lan", total: 1200, paid: true },
//         { id: "O04", customer: "Nam", total: 3500, paid: false },
//         { id: "O05", customer: "Mai", total: 800, paid: true },
//         { id: "O06", customer: "Linh", total: 4200, paid: false }
//     ]
//     for (const bill of bills) {
//         if (bill.paid === false){
//             console.log(`ID:${bill.id}, Customer:${bill.customer}, Total:${bill.total}`)
//         } 
//     }
//     //Tinh doanh thu
//     let totalRevenue = 0;
//     let paidRevenue = 0;
//     let unpaidRevenue = 0;

//     for (const bill of bills) {
//         totalRevenue += bill.total;

//         if (bill.paid) {
//             paidRevenue += bill.total;
//         } else {
//             unpaidRevenue += bill.total;
//         }
//     }
//     console.log("===== DOANH THU =====");
//     console.log("Tổng doanh thu:", totalRevenue);
//     console.log("Doanh thu đã thanh toán:", paidRevenue);
//     console.log("Doanh thu chưa thanh toán:", unpaidRevenue);

//     //Don hang lon nhat
//     let maxBill = bills[0];

//     for (const bill of bills) {
//         if (bill.total > maxBill.total) {
//             maxBill = bill;
//         }
//     }
//     console.log("\n===== ĐƠN HÀNG LỚN NHẤT =====");
//     console.log(`Đơn hàng lớn nhất là của ${maxBill.customer} với số tiền ${maxBill.total}` );




