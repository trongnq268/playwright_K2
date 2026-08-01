import { IProduct, ICartSummary, IDeliveryAddress } from "../types/checkout.interface";
import { IAddress, IUserRegister } from "../types/user.interface";

export const mapProductToCartSummary = (
  products: IProduct[],
): ICartSummary => {
  let priceList = products.map(
    (item) => item.productQty * item.productUnitPrice,
  );
  let totalAmt = priceList.reduce((total, price) => {
    return total + price;
  }, 0);

  let mappedProducts = products.map((product, index) => {
    return {
      productName: product.productName,
      productUnitPrice: `Rs. ${product.productUnitPrice}`,
      productQty: product.productQty.toString(),
      productTotalPrice: `Rs. ${priceList[index]}`,
    };
  });
  return {
    products: mappedProducts,
    totalOrderAmt: `Rs. ${totalAmt}`,
  };
};

export const formatUserInfoToCheckoutAddress = (
  userInfo: IUserRegister,
  userAddress: IAddress,
): IDeliveryAddress => {
  return {
    fullName: `Mr. ${userInfo.firstName} ${userInfo.lastName}`,
    company: userAddress.company,
    addressLine1: userAddress.address1,
    addressLine2: `${userAddress.city} ${userAddress.state} ${userAddress.zipcode}`,
    country: userAddress.country,
    phone: userInfo.phone,
  };
};

export const convertPriceText = (priceText: string): number => {
  let priceString = priceText.replace("Rs. ", "").trim();
  return Number(priceString);
};
