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
    <div
      style={{
        display: 'flex',
        // flexDirection: 'row',
        alignItems: 'center',
        // flexWrap: 'wrap',
        height: '100vh',
      }}
    >
      <h1>Login form</h1>
      <form onSubmit={loginUser}>
        <ul>
          <li>
            <input
              id='email'
              type='text'
              name='email'
              onChange={updateFormData}
            />
          </li>
          <li>
            <input
              id='password'
              type='text'
              name='password'
              onChange={updateFormData}
            />
          </li>
        </ul>

        <button type='submit' value='Login'>
          Login
        </button>
      </form>
    </div>
  );
}
