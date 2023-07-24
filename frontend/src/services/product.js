import api from '.';

const PRODUCT_ROUTES = {
  CREATE_PRODUCT: '/product/create',
  GET_APPROVED_PRODUCTS: '/product/all-approved',
  GET_ALL_PRODUCTS: '/product/admin-all',
  GET_PRODUCTS_BY_USER_ID: '/product/by-user-id',
};

export const createProductApi = async data => {
  try {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('brand', data.brand);
    formData.append('model', data.model);
    formData.append('yearOfManufacture', data.yearOfManufacture);

    data.images.forEach(image => {
      formData.append(`files`, image);
    });

    const response = await api.post(PRODUCT_ROUTES.CREATE_PRODUCT, formData);

    return {
      success: true,
      data: { ...response.data },
    };
  } catch (err) {
    return {
      success: false,
      data: err.response.data.message,
    };
  }
};

export const getApprovedProductsApi = async () => {
  try {
    const response = await api.get(PRODUCT_ROUTES.GET_APPROVED_PRODUCTS);

    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      data: err.response.data.message,
    };
  }
};

export const getAdminProductsApi = async (page = 1, queryString, options = {}) => {
  console.log(queryString);

  try {
    const response = await api.get(
      `${PRODUCT_ROUTES.GET_ALL_PRODUCTS}?page=${page}&limit=${20}&${queryString}`,
      options
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      data: err.response.data.message,
    };
  }
};

export const getProductsByUserIdApi = async userId => {
  try {
    const response = await api.get(`${PRODUCT_ROUTES.GET_PRODUCTS_BY_USER_ID}/${userId}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      data: err.response.data.message,
    };
  }
};
