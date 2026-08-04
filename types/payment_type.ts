//Interface thông tin thẻ thanh toán
export interface IOrderNote {
    note: string,
}
export interface IOrderCard {
    nameOnCard: string,
    cardNumber: string,
    cvc: string | number,
    monthExp: number,
    yearExp: number,
}