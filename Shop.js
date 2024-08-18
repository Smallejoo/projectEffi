  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import {jwtDecode} from 'jwt-decode';
  import axios from 'axios';
  import Cart from './Cart';
  import Item from './Item';
  import '../styles.css';



  const Shop = () => {
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState([]);
    const [userIdUS,setUserId]=useState('');
    const [filterValue,setFilterValue]=useState('');
    const [triggerFilter,setTriger]=useState(false);
    const [triggerAllitem,setTrigerAll]=useState(false);
    const setCartf=async()=>{
      console.log('we were in setcart func')
      const cartData=await axios.get('http://localhost:3000/getitems/cart?UserId=' +  userIdUS)
      console.log("🚀 ~shop setCartf ~ userIdUS:", userIdUS)
      console.log("🚀 ~shop setCartf ~ cartData:", cartData)
      setCart(cartData.data);
    }

    useEffect(() => {
      const decodeToken= ()=> {
        const token=localStorage.getItem('token');
        console.log("🚀 ~ useEffect ~ token:", token)
        if(token)
        {
          const decodedToken=jwtDecode(token);
          console.log("~ shop ~ refrazing token what is it now ? ",decodedToken);
          try{

            setUserId(decodedToken.id);
          }catch(error)
          {
            console.log("error from set id in shop",error);
          }
          console.log("X~X shop X~X docoded token id is ? ",decodedToken.id," and are we able to set it in usestate: ",userIdUS," X~X");
        
        }
      }
      const setCartf=async()=>{
        console.log('Xx shop xXwe were in setcart func')
        const cartData=await axios.get('http://localhost:3000/getitems/cart?UserId=' +  userIdUS)
        console.log("🚀 ~shop setCartf ~ userIdUS:", userIdUS)
        console.log("🚀 ~shop setCartf ~ cartData:", cartData)
        setCart(cartData.data);
      }
      const fetchItems = async () => {
        try {
          const { data } = await axios.get('http://localhost:3000/getitems/all');
          if(Array.isArray(data))
          {

            setItems(data);
          }
          else{
            setItems([]);
          }
        } catch (error) {
          console.error('Error fetching items:', error);
        }
        
      };
      fetchItems();
      decodeToken();
      setCartf();
      setTrigerAll(false);
    }, [userIdUS,triggerAllitem]);
    const trigger=()=>
    {
      setTriger(true);
    }
    useEffect(()=>
    {
      const submitFilterSarchF=async()=>
      {
        console.log("XxXx filter func xXxX");
        
        if(!(filterValue===''))
        {
         const   filteredData=await axios.get("http://localhost:3000/getitems/filter?value="+filterValue);
          console.log("xX submiter xX filter.filtered ",filteredData.filtered);
          console.log("Xx submiter xX  filter.data",filteredData.data);
          

          if(Array.isArray(filteredData.data.filtered))
          {
            console.log("Xx submitFilter xX if statment")
            setItems(filteredData.data.filtered);
          }
          else if(setItems.length<=0 ){
            try {
              
            console.log("Xx submitFilter xX else ")
              const { data } = await axios.get('http://localhost:3000/getitems/all');
              if(Array.isArray(data))
              {
    
                setItems(data);
              }
              else{
                setItems([]);
              }
            } catch (error) 
            {
              console.error('Error fetching items:', error);
            }
        }
       


        }
        
      }
      
      submitFilterSarchF();
      setTriger(false);
    },[triggerFilter]);

    const addToCartBackE  =async (userId,itemName)=>{
      //console.log('addtocart shop back end  what is in the user id and itemname ',userId,'  ',itemName)
        await axios.post('http://localhost:3000/getitems/addtoUserCart',{userId,itemName})

    }

    const addToCart = (item) => {
      setCart([...cart, item]);
      //const userId=localStorage.getItem('id');
      const itemName=item.name;
      try{
        addToCartBackE(userIdUS,itemName);
        
      }catch(error)
      {
        alert(error)
      }

    };

    return (
      <div>
        <h3>Shop page</h3>
        <input
        type="text"
        placeholder='enter what you sarch'
        value={filterValue} 
        onChange={(e)=> setFilterValue(e.target.value)}
        />
        <button
        onClick={trigger}
        >Filter</button>
        <div>
          {items.map((currItem) => (
            <Item key={currItem._id} itemStorage={currItem} addTocartFunc={addToCart} />
          ))}
        </div>
        <Link to="/Home"><button>Back Home</button></Link>
        <Cart cartStorage={cart} refteshFun={setCartf} />
      </div>
    );
  };

  export default Shop;
