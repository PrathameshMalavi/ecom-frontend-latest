export const environment = {
  baseUrl: "http://localhost:8180/api/",

  // oldbaseurl: "http://localhost:9090/",  (working spring)
  oldbaseurl: "http://localhost:8180/",
};

export const api = {};

export const oldapi = {
  //Products  :
  createTransaction: environment.oldbaseurl + "createTransaction/", // +ammount
  markAsDelivered: environment.oldbaseurl + "markAsDelivered/", // + orderId
  getAllOrderDetails: environment.oldbaseurl + "getAllOrderDetails/", // + status
  getOrderDetails: environment.oldbaseurl + "getOrderDetails/", // + status
  deleteCartItem: environment.oldbaseurl + "deleteCartItem/", // + cartId
  addNewProduct: environment.oldbaseurl + "addNewProduct", // + product

  getAllProductspageNumber:
    environment.oldbaseurl + "getAllProducts?pageNumber=", // + pageNumber + "&searchKey=" + searchKeyword

  getProductDetailsById: environment.oldbaseurl + "getProductDetailsById/", // + productId

  deleteProductDetails: environment.oldbaseurl + "deleteProductDetails/", // + productId
  getProductDetails: environment.oldbaseurl + "getProductDetails/", // + isSingleProductCheckout / productId

  placeOrder: environment.oldbaseurl + "placeOrder/", // + isCartCheckout
  addToCart: environment.oldbaseurl + "addToCart/", // + productId
  getCartDetails: environment.oldbaseurl + "getCartDetails",

  //UserService
  registerNewUser: environment.oldbaseurl + "registerNewUser",
  authenticate: environment.oldbaseurl + "authenticate",
  forUser: environment.oldbaseurl + "forUser",
  forAdmin: environment.oldbaseurl + "forAdmin",
};
