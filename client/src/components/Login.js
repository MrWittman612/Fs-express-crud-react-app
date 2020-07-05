import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { saveAuthToken } from '../utils/auth';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  let history = useHistory();

  const updateFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const loginUser = async (event) => {
    event.preventDefault();
    console.log('log formData::', formData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const result = await axios.post('/api/login', formData, config);
      console.log(result.data);

      saveAuthToken(result.data.token);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login form</h1>
      <form onSubmit={loginUser}>
        <input id='email' type='text' name='email' onChange={updateFormData} />
        <input
          id='password'
          type='text'
          name='password'
          onChange={updateFormData}
        />
        <button type='submit' value='Login'>
          Login
        </button>
      </form>
    </div>
  );
}
