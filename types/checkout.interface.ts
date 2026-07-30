
export interface ICartItem {
  itemName: string;
  itemUnitPrice: string;
  itemQuantity: string;
  itemTotalPrice: string;
}

export interface IProductSummary {
  productName: string, 
  productUnitPrice: string, 
  productQty: string | number, 
  productTotalPrice: string, 
}

export interface IDeliveryAddress {

}

export interface IOrderSummary {
  products: IProductSummary[], 
  totalAmt: string
}

export interface ICreditCard {
  cardName: string, 
  cardNumber: string, 
  cvv: string, 
  expMonth: string, 
  expYear: string
}