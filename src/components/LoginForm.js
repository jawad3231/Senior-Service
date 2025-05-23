import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send POST request
    axios.post('http://localhost:5001/api/login', {
      email: email,
      password: password
    })
    .then((response) => {
      console.log('Response:', response.data);
      setResponseMessage('Data sent successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      setResponseMessage('Failed to send data.');
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <br />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
}

export default Login;
