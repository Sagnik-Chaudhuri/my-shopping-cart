import React, { useEffect, useRef, useState } from 'react';

const Item = (props) => {
  const { name, quantity, price, setCartState } = props;
  return (
    <div>
      <div>{name}</div>
      <div>{quantity}</div>
      <div>{price}</div>
    </div>
  );
};

export default Item;
