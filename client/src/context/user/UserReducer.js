import { login, register, logout, clear_errors, auth_error } from '../types';

export default (state, action) => {
  switch (action.type) {
    case user_loaded:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case login:
    case register:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case auth_error:
    case logout:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case clear_errors:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
