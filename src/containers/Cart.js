import React, { useEffect, useRef, useState } from 'react';
import { Item, PriceContainer } from '../components/Cart';

import * as constants from '../constants/index';
import './Cart.css';

const Cart = () => {
  const [cartState, setCartState] = useState(constants.initialCartState);

  return (
    <div className='container'>
      <div className='headerLine'>
        <h1>Order Summary</h1>
      </div>
      {cartState.length > 0 && (
        <div className='itemsHeaderContainer'>
          <div className='itemHeader'>Items ({cartState.length})</div>
          <div>Qty</div>
          <div>Price</div>
        </div>
      )}
      {cartState.map((item, _index) => (
        <Item
          key={item.id}
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
