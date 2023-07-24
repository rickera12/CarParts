import api from '.';

const COMMENT_ROUTES = {
  GET_MESSAGES: '/comment/for-product',
  CREATE_MESSAGE: '/comment/create',
};

export const getCommentsApi = async productId => {
  try {
    const response = await api.get(`${COMMENT_ROUTES.GET_MESSAGES}/${productId}`);

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

export const createCommentApi = async (message, productId) => {
  try {
    const response = await api.post(`${COMMENT_ROUTES.CREATE_MESSAGE}`, {
      message,
      productId,
    });

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
