import React from 'react';
import '../styles.css';



const Item =({itemStorage, addTocartFunc}) =>
{
    return(
        <div>
            <h4>{itemStorage.name}</h4>
            <p>Price: {itemStorage.price}</p>
            <img src={itemStorage.img} alt={itemStorage.name} width="100"/>
            <button onClick={()=>addTocartFunc(itemStorage)}>Add to cart</button>
        </div>
    );
};

export default Item;
