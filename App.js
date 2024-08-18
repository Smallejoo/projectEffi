// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Shop from './components/Shop';
import Admin from './components/AdminPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Shop" element={<Shop/>}/>
        <Route path='/Admin'element={<Admin/>}/>
      </Routes>
    </Router>
  );
};

export default App;
