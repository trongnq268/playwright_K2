export interface AddressDetails {
  fullName: string;
  company?: string;
  address1: string;
  address2?: string;
  cityStateZip: string;
  country: string;
  mobileNumber: string;
}

export interface CheckoutOrderInfo {
  comment?: string;
}
