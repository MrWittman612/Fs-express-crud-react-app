import React from 'react';

export function Home() {
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div className='App'>
      <h1>Hello Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
