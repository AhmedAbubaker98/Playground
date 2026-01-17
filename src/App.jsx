import React from 'react';

export default function App() {
  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Login Page</h1>
      <p>Please sign in to continue.</p>
      
      {/* 

      */}
      <button className="btn-primary" id="submit-button">
        Sign In
      </button>
    </div>
  );
}