import React from 'react';
import '../styles.css';



const EditItem=({itemInfo,editFunc,buttonText})=>{

    return(

        <div>
            <h4>{itemInfo.name}</h4>
            <button onClick={()=>editFunc()}>{buttonText}</button>

        </div>

    )
}

export default EditItem;
