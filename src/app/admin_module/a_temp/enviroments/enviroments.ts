export const environment = {
  baseUrl: 'http://localhost:8080/api/',
};

export const api = {
  postCategory: environment.baseUrl + 'category/add', //post Category
  getListCategory: environment.baseUrl + 'category', //get List
  //

  postProduct: environment.baseUrl + 'products/add', //post Category
  getListProduct: environment.baseUrl + 'products', //get List
};
