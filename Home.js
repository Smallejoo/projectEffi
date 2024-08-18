// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';



const Home = () => {
  return (
    <div>
      <h2>Welcome to the shop</h2>
      <Link to="/login"><button>Login</button></Link>
      
      <Link to="/register"><button>Register</button></Link>
    </div>
  );
};

export default Home;
