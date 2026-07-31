
export interface IProduct {
  productName: string, 
  productUnitPrice: string, 
  productQty: string, 
  productTotalPrice: string, 
}

export interface ICartSummary {
  products: IProduct[], 
  totalAmt: string
}

export interface IOrderAddress {
  deliveryAddress: IDeliveryAddress, 
  billingAddress: IBillingAddress
}

export interface IDeliveryAddress {
  fullName: string, 
  company ?: string,
  addressLine1: string, //street road
  addressLine2: string, //state, city and zipcode
  country: string,
  phone: string
}

export interface IBillingAddress {
  fullName: string, 
  company ?: string,
  addressLine1: string, //street road
  addressLine2: string, //state, city and zipcode
  country: string,
  phone: string
}

export interface ICreditCard {
  cardName: string, 
  cardNumber: string, 
  cvv: string, 
  expMonth: string, 
  expYear: string
}