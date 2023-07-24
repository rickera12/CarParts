import { api } from '.';
import { LS_KEYS } from '../constants';

const USER_ROUTES = {
  REGISTER: '/user/register',
  LOGIN: '/user/login',
  PROFILE: '/user/profile',
  HEALTH: '/user/health',
  CHECK_EMAIL: '/user/check-email',
};

export const registerApi = async data => {
  try {
    const response = await api.post(USER_ROUTES.REGISTER, data);

    localStorage.setItem(LS_KEYS.TOKEN, response.data.token);

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

export const loginApi = async data => {
  try {
    const response = await api.post(USER_ROUTES.LOGIN, data);

    localStorage.setItem(LS_KEYS.TOKEN, response.data.token);

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

export const getProfileApi = async () => {
  try {
    const response = await api.get(USER_ROUTES.PROFILE);

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

export const checkEmailApi = async email => {
  try {
    const response = await api.get(`${USER_ROUTES.CHECK_EMAIL}/${email}`);
    return response.data.exists;
  } catch (err) {
    console.error(`Error checkEmailApi api request: ${err}`);
  }
};
