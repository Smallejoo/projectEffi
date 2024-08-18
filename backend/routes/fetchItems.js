// backend/routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const User = require('../models/User');
router.post('/deleteitem',async(req,res)=>{

  try{

    const currItemDelete=req.body.currItem;
    console.log("Xx delete item xX the item we are trying to delete",req);
    console.log("Xx delete item xX the item we are trying to delete ",currItemDelete);
    const result = await Item.deleteOne(currItemDelete);
    if(result.acknowledged)
    {res.status(200).json("item was deleted ")}
    else{
      res.status(404).json("some thing went wrong ")
    }
  }catch(e)
  {
    console.log(e);
  }
})
router.get('/cart',async(req,res)=>{
try{
  console.log('fetching items getting cart data spess user ');
  const UserId=req.query.UserId;
  console.log("🚀 ~ router.get ~ UserId:", UserId)
  if (!UserId) {
  console.log("🚀 ~ router.get ~ UserId2:", UserId)
    res.status(200).send()
  }
  console.log("🚀 ~ router.get ~ req.params:", req.query)

  const userItself= await User.findById(UserId).populate('cart');
  const cartItself=userItself.cart;
  res.status(200).json(cartItself);

  
}catch(error)
{
  console.log(error);
}
});
router.get('/all', async (req, res) => {
  try {
    console.log('Trying to fetch items');
    const itemsFDB = await Item.find({});
    itemsFDB.forEach(item => {
      console.log(item.name);
    });
    res.status(200).json(itemsFDB);
  } catch (error) {
    console.log('Error in get all items route:', error.message);
    res.status(500).json({ error: 'Error fetching items' });
  }
});
router.post('/editItem',async(req,res)=>{
  try{

    console.log("Xx fetchingItems xX edititem what we got inside ",req.body)
      const itemOriginalName=req.body.DBitemName;
      console.log("Xx fetchingItemsxX item original name  ",itemOriginalName);
    const result =await Item.updateOne(
      {name:itemOriginalName},
      {
        $set:
        { name:req.body.name,
          price:req.body.price,
          img:req.body.img,
          type:req.body.type}
      }
      
    )
    console.log("Xx editItem xX what is inside result ", result);
    if(result.acknowledged)
    {
      res.status(200).json("all good ");
      console.log("item should be updated ");

    }
    else{
      res.status(404).json("some thing went wrong ");
    }
  }catch(e)
  {
    console.log(e);
  }
})
router.post('/addtoDB', async (req, res) => {
  try {
    console.log("trying to add items");
    let itemsToAdd = req.body;
    console.log('yyyyyyyyyyyyyyy',itemsToAdd.img);
    if (!Array.isArray(itemsToAdd)) {
      itemsToAdd = [itemsToAdd];
    }
    const itemsAdded = await Promise.all(
      itemsToAdd.map(async (item) => {
        const curritem = new Item({ name: item.name, price: item.price, img: item.img ,type:item.type});
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx',curritem.img);
        return await curritem.save();
      })
    );
    res.status(201).json({ message: 'Items added successfully', items: itemsAdded });
  } catch (error) {
    console.error("Error at adding new items: ", error);
    res.status(500).json({ error: 'Failed on the backend side' });
  }
});
router.post ('/removeItemFromCart',async (req,res)=>
{
  console.log("trying to remove item from cart ");
  const userId=req.body.userId;
  const itemName=req.body.itemName;
  console.log('fetchitems in removeitemfromcart req body -->',req.body);
  
  console.log('fetchitems in removeitemfrom cart user id -->',userId);
  console.log('fetchitems in removeitemfrom cart item name -->',itemName);
  
  try{
    const itemToRemove= await Item.findOne({name:itemName})
    if(!itemToRemove)
    {
console.log('didnt find item');
    }
    const user= await User.findById(userId);
    if(!user)
      console.log('didnt find user by id ');
    console.log("what user got inside ",user);
    console.log("Xx Fatchitems xX", itemToRemove._id);
    console.log("Xx fetchitems xX itemsToRemove got -->",itemToRemove);
    const index=user.cart.findIndex((itemCart)=>itemCart.equals(itemToRemove._id));
    
    user.cart.splice(index,1);
    await user.save();
    res.status(200).json({Message:"item got removed "})

  }catch(error)
  {
    console.log(error);
  }

});

router.post('/addtoUserCart',async(req,res)=>
{
  console.log("trying to add item to user cart");
const userId = req.body.userId;
const item = req.body.itemName;
try{
  const itemtoSave= await Item.findOne({name: item});
  console.log('add to user cart what is in itemtosave',itemtoSave);
if(!itemtoSave)
{
  console.log("did not find item");
}
console.log(userId,"user id should be here ");
 const user= await User.findById(userId);
 if(!user)
 {
  console.log('didnt find user');
 }
 console.log("item should be in cart ");
 user.cart.push(itemtoSave);
 await user.save();
 res.status(200).json({Message:"item added to cart "});
}catch(error)
{
  console.log(error)
}

});
router.get('/filter', async (req, res) => {
  const filterValue = req.query.value;
  try {
    console.log("Xx filter xX the query ", req.query);

    let foundItems = [];

    // Check if the filter value is a valid number
    const parsedNumber = parseInt(filterValue, 10);

    if (!isNaN(parsedNumber)) {
      // If it's a number, try to find by price
      foundItems = await Item.find({ price: parsedNumber });
    }

    if (foundItems.length === 0) {
      // If not found by price or not a number, try to find by name or type
      foundItems = await Item.find({name: {$regex:filterValue}});
      console.log("xXxX filter xXxX found items by name ", foundItems);
      if(foundItems.length<=0)
      {
        foundItems=await Item.find({type:filterValue});
      }
    }

    if (foundItems.length > 0) {
      console.log("Xx filter xX filtered items found ", foundItems);
      res.status(200).json({ filtered: foundItems });
    } else {
      console.log("Xx filter xX no items found with ", filterValue);
      const allItems=await Item.find({})
      res.status(200).json({ filtered:allItems });
    }
  } catch (error) {
    console.log("Xx filteredF xX there is an issue with filtered function ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
