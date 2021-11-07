import React, { useEffect, useRef, useState } from 'react';
import { Item, SummaryBox } from '../components/Cart';

import * as constants from '../constants/index';
import './Cart.css';

const Cart = () => {
  const [cartState, setCartState] = useState(constants.initialCartState);

  return (
    <div className='container'>
      <div className='header'>
        <h2>Order Summary</h2>
      </div>
      {cartState.length > 0 && (
        <div className='itemsHeaderContainer'>
          <p className='itemHeader'>Items ({cartState.length})</p>
          <p>Qty</p>
          <p>Price</p>
        </div>
      )}
      {cartState.map((item, _index) => (
        <Item
          key={item.id}
          image={item.img_url}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          setCartState={setCartState}
        />
      ))}
    </div>
  );
};

export default Cart;
