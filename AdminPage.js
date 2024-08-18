import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditItem from './EditItem';
import '../styles.css';



const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImg, setItemImg] = useState('');
  const [itemType, setItemType] = useState('');
  const [View, setView] = useState('addItem');
  const [Items, setItems] = useState([]);
  const [choosenItem,setChoosenItem]=useState()

  useEffect(() => {
    //if (View === 'edit') {
      try {
        const fetchItems = async () => {
          const response = await axios.get('http://localhost:3000/getitems/all');
          setItems(response.data);
        };
        fetchItems();
      } catch (error) {
        console.log("error in admin page in finding items ---", error);
      }
  //  }
  }, [View]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === 'itemName') {
      setItemName(value);
    } else if (name === 'itemPrice') {
      setItemPrice(value);
    } else if (name === 'itemImg') {
      setItemImg(value);
    } else {
      setItemType(value);
    }
  };

  const handleEdit = async (currItem) => {
    setView('choosenEdit');
    setChoosenItem(currItem);
    setItemImg('');
    setItemImg('');
    setItemPrice('');
    setItemType('');
  };

  const handleView = async (e) => {
    console.log('Xx handleView xX the target view',e.target.value); // Set view based on the selected value
    e.preventDefault();
    try {
      setView(e.target.value);
    } catch (er) {
      console.log(er);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const item = { name: itemName, price: itemPrice, img: itemImg, type: itemType };
      await axios.post('http://localhost:3000/getitems/addtoDB', [item]);
      alert('Item added successfully');
      setItemName('');
      setItemPrice('');
      setItemImg('');
      setItemType('');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        alert('Error adding item: ' + error.response.data.error);
      } else {
        alert('Error adding item: ' + error.message);
      }
    }
  };
  const handleEditEnd =async(e)=>
  {
    e.preventDefault();
   console.log('Xx handleEditEnd xX trying to send a post ');
   const {name,value}   =e.target;
   switch(name)
   {
    case 'item name':
    setItemName(value);
    break;
  
    case 'item price':
      setItemPrice(value);
      break;
    case 'item img':
        setItemImg(value);
        break;
    case 'item type':
      setItemType(value);
      break;
      default:
        break;
   }
   console.log('itemName before:', itemName);
   console.log('itemPrice before:', itemPrice);
   console.log('itemImg before:', itemImg);
   let nameL='';
   let priceL='';
   let imgL='';
   let item=
         {name:itemName,
           price:itemPrice,
          img:itemImg,
          type:itemType,
          DBitemName:choosenItem.name
          }
        if(itemName==='')
          {
             nameL=choosenItem.name;
              item.name=nameL;
          }
          if(itemPrice==='')
          {
             priceL=choosenItem.price;
             item.price=priceL;
          }
          if(itemImg==='')
          {
            imgL=choosenItem.img;
            item.img=imgL;
          }       
       


       
       // setView('choosenEdit')
        try{
await axios.post('http://localhost:3000/getitems/editItem',item);
        }catch(e)
        {
          console.log(e);
        }
    setChoosenItem('');
    setItemImg('');
    setItemName('');
    setItemPrice('');
    setItemType('');
    setView('add new');


   
   




  }
  const handleDelete =async(currItem)=>
  {
    console.log("Xx handledelete xX the item we try to delete",currItem);
    axios.post('http://localhost:3000/getitems/deleteitem',{ currItem:currItem});
    
    setView('add item');

  }

  return (
    <div>
      <select
        onChange={handleView}
        name='Choose format'
        value={View} // Corrected from viewFormat to View
      >
        <option value={'edit'}>edit format</option>
        <option value={'add new'}>add format</option>
        <option value={'delete item'}> delete item</option>
      </select>
      
      
      {
        View==='choosenEdit'&&(
          <div>
              <form onSubmit={handleEditEnd}>
                <input
                name = 'item name'
                placeholder={choosenItem.name}
                type='text'
                value={itemName}
                onChange={(e)=>setItemName(e.target.value)}
                />
              <input
              name='item price'
              type='number'
              placeholder={choosenItem.price}
              value={itemPrice}
              onChange={(e)=>setItemPrice(e.target.value)}
            />
            <input
              name='item img'
              type='text'
              placeholder={choosenItem.img}
              value={itemImg}
              onChange={(e)=>setItemImg(e.target.value)}
            />
            <select
              onChange={(e)=>setItemType(e.target.value)}
              name='item type'
              required
              value={itemType}
            >
              <option value=''>Select type</option>
              <option value='healing'>Healing</option>
              <option value='clothes'>Clothes</option>
              <option value='armor'>Armor</option>
              <option value='weapons'>Weapons</option>
            </select>
            <button type='submit'>Submit</button>
      
   </form>


          </div>
        )
      }
      {View === 'add new' && (
        <div>
          <h2>Add Item</h2>
          <form onSubmit={handleSubmit}>
            <input
              name='itemName'
              required
              placeholder='Enter item name'
              type='text'
              value={itemName}
              onChange={handleOnChange}
            />
            <input
              name='itemPrice'
              required
              type='number'
              placeholder='Enter amount'
              value={itemPrice}
              onChange={handleOnChange}
            />
            <input
              name='itemImg'
              required
              type='text'
              placeholder='Enter image URL'
              value={itemImg}
              onChange={handleOnChange}
            />
            <select
              onChange={handleOnChange}
              required
              name='itemType'
              value={itemType}
            >
              <option value=''>Select type</option>
              <option value='healing'>Healing</option>
              <option value='clothes'>Clothes</option>
              <option value='armor'>Armor</option>
              <option value='weapons'>Weapons</option>
            </select>
            <button type='submit'>Submit</button>
          </form>
          <Link to='/'>
            <button>Back Home</button>
          </Link>
        </div>
      )}

      {View === 'edit' && (
        <div>
          {Items.map((currItem) => (
            <EditItem key={currItem._id} itemInfo={currItem} editFunc={()=>handleEdit(currItem)} buttonText={"Edit Item"} />
          ))}
        </div>
      )}
      {
         View==='delete item'&&(
          <div>
             {Items.map((currItem)=>
            (
              <EditItem key={currItem._id} itemInfo={currItem} editFunc={()=>handleDelete(currItem)} buttonText={"delete item"} />
            ))}

          </div>
         )
      }
     
    </div>
  );
};

export default AddItem;
