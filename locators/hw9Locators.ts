import { Page } from "@playwright/test";

export const getLocators = (page:Page) =>({
    addProduct: addProductLocators(page),
    msgAddSuccess: addSuccessLocator(page),
    listProduct: listViewCartLocators(page),
    detailProduct: detailProductLocators(page),

})

export const addProductLocators = (page: Page)=> ({
    productLink: page.getByRole('link', { name: 'Products' }),
    addToCartBtn: page.getByText('Add to cart'),
    viewProducLink: page.getByRole('link', { name: 'View Product' }),
    priceProduct :(price: number) => 
        page.getByRole('heading', { name: `Rs. ${price}` }),
    nameProduct: (nameProduct: string) =>
        page.getByText(`${nameProduct}`),
})

export const addSuccessLocator = (page: Page) => ({
    productAddSuccessMsg: page.getByText('Your product has been added to cart.', { exact: true }),
    viewCartLink: page.locator(`u:has-text("View Cart")`),
    continueShoppingBtn: page.getByRole('button', { name: 'Continue Shopping' }),

})

export const detailProductLocators = (page: Page) => ({
    nameProduct: (nameProduct: string) =>
        page.getByRole('heading', { name: `${nameProduct}`, level: 2 }),
    quntityInput: page.locator('#quantity'),
    addToCartBtn: page.getByRole('button', { name: 'Add to cart' }),
})

export const listViewCartLocators = (page: Page) => ({
    quantiyProduct: (quantity: number) =>
        page.getByRole('button', { name: `${quantity}` }),
    priceProduct :(price: number) => 
        page.getByRole('heading', { name: `Rs. ${price}` }),
    total: (total: number) =>
        page.locator('.cart_total_price'),
    deleteProduct: page.locator(`#cart_info_table > tbody`),
})
