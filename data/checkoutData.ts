import { ICreditCard, IProductSummary } from "../types/checkout.interface";

export const PRODUCTS_TO_ADD: IProductSummary[] = [
  {
    productName: "Blue Top",
    productUnitPrice: "Rs. 500",
    productQty: "1",
    productTotalPrice: "Rs. 500",
  },
  {
    productName: "Men Tshirt",
    productUnitPrice: "Rs. 400",
    productQty: "1",
    productTotalPrice: "Rs. 400",
  },
];

export const ORDER_MSG: string = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since 1966, 
   when designers at letraset and James Mosley, the librarian at St Bride Printing Library in London`;

export const VALID_CREDIT_CARD: ICreditCard = {
  cardName: "Test test",
  cardNumber: "4111111111111111",
  cvv: "737",
  expMonth: "03",
  expYear: "30",
};
