// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email==='a@a.com')
    {
      nav('/Admin');
    }
    try {
      const res = await axios.post('http://localhost:3000/reg/auth/login', { email, password });
      alert('User logged in successfully');
      // Redirect to the next page or save the token
     
        nav('/Shop');

      

      localStorage.setItem('token', res.data.token);
      console.log("local storage token in login ",localStorage.getItem('token'))
    } catch (error) {
      alert('Error logging in: ' + error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/Home"><button>Back Home</button></Link>
    </div>
  );
};

export default Login;
