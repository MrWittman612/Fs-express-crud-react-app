import React, { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import axios from 'axios';
import { setContextAuthToken } from '../../utils';

export default function UserProvider(props) {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const loadUser = async () => {
    setContextAuthToken(localStorage.token);
  };

  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const result = await axios.post('/api/register', formData, config);
      dispatch({
        type: register,
        payload: result.data,
      });
    } catch (error) {}
  };

  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const result = await axios.post('/api/login', formData);
      dispatch({
        type: login,
        payload: result.data,
      });
      loadUser();
    } catch (error) {}
  };

  const logout = () => dispatch({ type: logout });

  const clearErrors = () => dispatch({ type: clear_errors });

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
