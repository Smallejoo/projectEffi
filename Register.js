// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';



const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/reg/auth/register', { username, email, password });
      alert('User registered successfully');
    } catch (error) {
      alert('Error registering user xxx: ' + error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
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
        <button type="submit">Register</button>
      </form>
      <Link to="/Home"><button>Back Home</button></Link>
    </div>
  );
};

export default Register;
