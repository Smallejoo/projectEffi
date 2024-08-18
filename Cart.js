import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Item from './Item';
import '../styles.css';


const Cart = ({ cartStorage,refteshFun }) => {
  console.log("🚀 ~ Cart ~ cartStorage:", cartStorage)
  const [userIdUS,setUserId]=useState([]);
  const deleteItem = async (itemName)=>{
    try{
      //const userId=localStorage.getItem("id");
    const token=localStorage.getItem('token');
    const decodeToken=jwtDecode(token);
    console.log('Xx cart xX local token in shop befor decoding ',token);
    console.log('Xx cart xX efter decoding shop ',decodeToken);
    //const decodedToken = jwtDecode(token);
    const userId=decodeToken.id;
    console.log('Xx cart xX efter decoding only id ',userId);
    //alert("Xx cart xX user id ",userId);
    console.log("Xx cart xX  itemname we send to bakc end ",itemName);
    const res= await axios.post('http://localhost:3000/getitems/removeItemFromCart',{itemName,userId});
    console.log("Xx cart xX wuts the res ",res.status);
    if(res.status===200)
    refteshFun();
    //alert(" Xx cart xX item should be removed ");
  }catch(error)
  {
    alert(error,"some thing went wrong ");
  }

}

  return (
    <div>
      <h3>Your cart</h3>
      {cartStorage?.length === 0 ? (
        <p>No items</p>
      ) : (
        <ul>
          {cartStorage?.map((curritem, index) => (
            <li key={index}>
              {curritem.name}  {curritem.price}
              <button type='button'onClick={()=>deleteItem(curritem.name)}>delete item</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
