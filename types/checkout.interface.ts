export type AddressUI = "deliveryAddressUI" | "billingAddressUI";

export interface ICartItem {
  productName: string;
  productUnitPrice: string;
  productQty: string;
  productTotalPrice: string;
}

export interface IProduct {
  productName: string;
  productUnitPrice: number;
  productQty: number;
}

export interface ICartSummary {
  products: ICartItem[];
  totalOrderAmt: string;
}

export interface ICreditCard {
  cardName: string;
  cardNumber: string;
  cvv: string;
  expMonth: string;
  expYear: string;
}

export interface IDeliveryAddress {
  fullName: string;
  company?: string;
  addressLine1: string; //street road
  addressLine2: string; //state, city and zipcode
  country: string;
  phone: string;
}

export interface IBillingAddress extends IDeliveryAddress {}
