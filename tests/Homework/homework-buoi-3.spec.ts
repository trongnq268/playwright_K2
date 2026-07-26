import { test, expect } from '@playwright/test';

test('bai tap ve nha buoi 3', async () => {
 //Yeu cau 1: Khai bao du lieu
    let tenKhachHang: string = "Nguyen Van A";
    let tenSanPham: string = "iPhone 16 Pro";
    let giaSanPham: number = 25000000;
    let soLuong: number = 2;
    let phiVanChuyen: number = 50000;
    const maGiamgia: string = "SUMMER10";
    const giaTriGiamGia: number = 2000000;
    let trangThaiDonHang: string = "SUCCESS";

    //Yeu cau 2: Tinh toan
    let thanhTienSanPham: number = giaSanPham*soLuong; 
    let tongTienTruocGiamGia: number = thanhTienSanPham;
    let tongTienSauGiamGia: number = thanhTienSanPham - giaTriGiamGia;
    let tongTienPhaiThanhToan: number = tongTienSauGiamGia + phiVanChuyen;

    //Yeu cau 3: Kiem tra du lieu
    console.log("Ten khach hang la: ", tenKhachHang);
    console.log("Ten san pham la: ", tenSanPham);
    console.log("Gia san pham lon hon 20000000", giaSanPham > 20000000);
    console.log("So luon san pham: ", soLuong);
    console.log("Phi van chuyen lon hon 0", phiVanChuyen >0);
    console.log("Ma giam gia khac chuoi rong", maGiamgia !== null);
    console.log("Tong tien sau giam gia < tong tien truoc giam gia", tongTienSauGiamGia < tongTienTruocGiamGia);
    console.log("Trang thai don hang: ",trangThaiDonHang);
    //Lưu kết quả của mỗi phép kiểm tra vào một biến kiểu boolean.
    expect(tenKhachHang === "Nguyen Van A").toBe(true);
    expect(tenSanPham === "iPhone 16 Pro").toBe(true);
    expect(giaSanPham > 20000000).toBe(true);
    expect(phiVanChuyen > 0).toBe(true);
    expect(maGiamgia !== null).toBe(true);
    expect(tongTienSauGiamGia < tongTienTruocGiamGia).toBe(true);
    expect(trangThaiDonHang ==="SUCCESS").toBe(true);

    // Yeu cau 4: Xac minh bang expect()
    console.log("Yeu cau 4:");
    expect(thanhTienSanPham).toBe(25000000*2);
    expect(tongTienTruocGiamGia).toBe(25000000*2);
    expect(tongTienSauGiamGia).toBe(25000000*2-2000000);
    expect(tongTienPhaiThanhToan).toBe(tongTienSauGiamGia + 50000);
    expect(giaSanPham > 20000000).toBe(true);
    expect(phiVanChuyen > 0).toBe(true);
    expect(maGiamgia === "SUMMER10").toBe(true);

    // Yeu cau 5: In ket qua
    console.log("In ket qua theo yeu cau 5");
    console.log("========== ORDER SUMMARY ==========");
    console.log("Custommer    : ",tenKhachHang);
    console.log("Product      : ", tenSanPham);
    console.log("Unit Price   : ", giaSanPham);
    console.log("Quantity     : ", soLuong);
    console.log("Subtotal     : ", thanhTienSanPham);
    console.log("Discount Code: ", maGiamgia);
    console.log("Discount Amount: ", giaTriGiamGia);
    console.log("Shipping Fee : ", phiVanChuyen);
    console.log("Final Amount : ", tongTienPhaiThanhToan);
    console.log("Order Status : ", trangThaiDonHang);
    console.log("===================================");
 
    // Yeu cau 6: Tinh thue VAT
    let phiVAT:number = tongTienTruocGiamGia * (8/100);
    console.log("So tien VAT = ", phiVAT);
    let tongTienGomVAT: number = tongTienPhaiThanhToan + phiVAT;
    console.log("Tong tien sau khi cong VAT la: ", tongTienGomVAT);
    expect(tongTienGomVAT === (25000000*2-2000000+50000+phiVAT)).toBe(true);

    // Yeu cau 7: Thuc hien them phep tinh
    console.log("So tien giam tren moi san pham la: ", giaTriGiamGia); // De bai khong noi ro la ap dung ma cho don tu bao nhieu
    let tongChiPhiPhatSinh: number = phiVAT + phiVanChuyen;
    console.log("Tong chi phi phat sinh = ", tongChiPhiPhatSinh);
    let khoanChenhLech: number = tongTienGomVAT - tongTienTruocGiamGia;
    console.log(" Chenh lech giua tong tien truoc giam gia va tong tien cuoi cung = ", khoanChenhLech);

    // Yeu cau 8: Doi du lieu bang let
    console.log("Tien hanh yeu cau 8")
    soLuong = 3;  
    thanhTienSanPham = giaSanPham * soLuong;
    tongTienTruocGiamGia = thanhTienSanPham;
    tongTienSauGiamGia = thanhTienSanPham - giaTriGiamGia;
    tongTienPhaiThanhToan = tongTienSauGiamGia + phiVanChuyen;
    phiVAT = tongTienTruocGiamGia * (8/100);
    tongTienGomVAT = tongTienPhaiThanhToan + phiVAT;    
    console.log("So luong sau thay doi = ", soLuong);
    console.log("Thanh tien san pham = ", thanhTienSanPham);
    console.log("Tong tien truoc giam gia = ", tongTienTruocGiamGia)
    console.log("Tong tien sau giam gia = ", tongTienSauGiamGia);
    console.log("Phi VAT = ", phiVAT),
    console.log("Tong chi phi gom VAT = ", tongTienGomVAT);
    expect(thanhTienSanPham).toBe(25000000*3);
    expect(tongTienTruocGiamGia).toBe(25000000*3);
    expect(tongTienSauGiamGia).toBe(25000000*3-2000000);
    expect(phiVAT).toBe(tongTienTruocGiamGia*(8/100));
    expect(tongTienGomVAT).toBe(phiVAT+tongTienSauGiamGia+50000)


    // Yeu cau 9: Kiem tra phep cong nhieu bien
    let tongThanhToan: number = thanhTienSanPham + phiVanChuyen - giaTriGiamGia + phiVAT;

    // Yeu cau 10: 
    console.log("Tiến hành yêu cầu 10");
    let actualSubtotal: number = thanhTienSanPham;
    let actualFinalAmount: number = tongTienGomVAT;
    let expectedSubtotal: number = giaSanPham * soLuong;
    let expectedFinalAmount: number = giaSanPham * soLuong - giaTriGiamGia + phiVanChuyen + phiVAT;
    console.log("Actual Subtotal   = ", actualSubtotal);
    console.log("Expected Subtotal = ", expectedSubtotal);
    console.log("Actual Final Amount   = ", actualFinalAmount);
    console.log("Expected Final Amount = ", expectedFinalAmount);
    expect(actualSubtotal).toBe(expectedSubtotal);
    expect(actualFinalAmount).toBe(expectedFinalAmount);

});


test('Thực hành - buổi 6', async() => {
    const orderList = [
        {  id: 'O01', customer: 'An', total: 500, paid: true },
        {  id: 'O02', customer: 'Bình', total: 2200, paid: false },
        {  id: 'O03', customer: 'Lan', total: 1200, paid: true },
        {  id: 'O04', customer: 'Nam', total: 3500, paid: false },
        {  id: 'O05', customer: 'Mai', total: 800, paid: true },
        {  id: 'O06', customer: 'Linh', total: 4200, paid: false },
    ];
    // in các đơn chưa thanh toán
    console.log('---Các đơn hàng chưa thanh toán---');
    let totalRevenue = 0;
    let unpaid = 0;
    let paid = 0;
    let max = 0;
    for (const printOrder of orderList){
        totalRevenue += printOrder.total;
        if (printOrder.paid === false ){
            console.log(`Đơn hàng ${printOrder.id}`);
            unpaid += printOrder.total;
        }
        if (printOrder.paid === true ){
            console.log(`Đơn hàng ${printOrder.id}`);
            paid += printOrder.total;
        }
        if( max < printOrder.total) max = printOrder.total;
        
    }
    
    // Tổng doanh thu
    console.log(`Tổng doanh thu tất cả đơn hàng là: ${totalRevenue}`);
    console.log(`Tổng doanh thu chưa thanh toán là: ${unpaid}`);
    console.log(`Tổng doanh thu đã thanh toán là: ${paid}`);
    

    for (const checkMax of orderList){
        if( max === checkMax.total){
            console.log(`Đơn hàng có giá trị lớn nhất là: ${checkMax.id}`);
        }
    }
});


