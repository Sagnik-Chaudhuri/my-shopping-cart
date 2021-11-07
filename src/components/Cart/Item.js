import React, { useEffect, useState } from 'react';
import './Item.css';
// style={{ backgroundImage: `url(${image})` }}
const Item = (props) => {
  const { name, quantity, price, image, setCartState } = props;
  return (
    <div className='itemContainer'>
      <div className='item'>
        <span style={{ backgroundImage: `url(${image})`, width: '50px', height: '50px' }} />
        <span className='itemName'>{name}</span>
        <button className='itemRemoveButton' type='button' onClick={() => console.log('lol')}>
          X
        </button>
      </div>
      <div className='itemQuantityContainer'>
        <button type='button' onClick={() => console.log('decrement')}>
          -
        </button>
        <span>{quantity}</span>
        <button type='button' onClick={() => console.log('increment')}>
          +
        </button>
      </div>
      <div>${price}</div>
    </div>
  );
};

export default Item;
