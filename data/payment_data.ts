import {IOrderNote, IOrderCard} from '../types/payment_type';

export const noteOrder = (): {note: IOrderNote} =>{
    const note: IOrderNote = {
        note: 'Giao hàng trong vòng 24 giờ giúp tôi.'
    }
    return {note};
}

export const paymentInfor = (): {infor: IOrderCard} =>{
    // yearExp: field "Expiration Year" trên trang /payment có placeholder "YYYY" (4 số),
    // không phải "YY" — sửa từ 26 -> 2028 để đúng định dạng thật của form (không phải thẻ thật)
    const infor: IOrderCard = {
        nameOnCard: 'Nguyen Van A',
        cardNumber: '1234567890',
        cvc: '123',
        monthExp: 10,
        yearExp: 2028,
    }
    return {infor};
}