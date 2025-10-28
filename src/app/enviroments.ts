export const environment = {
  baseUrl: "http://localhost:8180/api/",

  // oldbaseurl: "http://localhost:9090/",  (working spring)
  oldbaseurl: "http://localhost:8180/",
  forntendBaseUrl: "http://localhost:4200/",
};
export const oldRoles = {
  user: "User",
  admin: "Admin",
};

export const api = {};

//
//
//
//
//
//New

export const newRoles = {
  user: "user",
  admin: "admin",
  unauthorized: "unauthorized",
};

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
  userEntry: environment.oldbaseurl + "api",

  // CarouselService
  getAllCarousel: environment.oldbaseurl + "carousel",
  addCarousel: environment.oldbaseurl + "carousel",
  updateCarousel: environment.oldbaseurl + "carousel/", // + id
  deleteCarousel: environment.oldbaseurl + "carousel/", // + id

  // address
  getAllAddress: environment.oldbaseurl + "address/", // + userName
  addAddress: environment.oldbaseurl + "address/", // + id
  updateAddress: environment.oldbaseurl + "address/", // + id
  deleteAddress: environment.oldbaseurl + "address/", // + id
};

export const frontendUrl = {
  login: environment.forntendBaseUrl + "login",
  home: environment.forntendBaseUrl + "",
};

export const razorPay = {
  key_id: "rzp_test_RYQrZWZnEz52RQ,",
  key_secret: "4hq0ISZTg0t6YuMGB7cLrEHN",
};
