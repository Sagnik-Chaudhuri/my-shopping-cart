import React, { useEffect, useRef, useState } from 'react';

const PriceContainer = (props) => {
  const { itemsCount, priceWithoutDiscount, discountsArray, priceWithDiscount } = props;

  return (
    <div>
      <div>Total</div>
      <div>
        <div>Items ({itemsCount}) :</div>
        <div> ${priceWithoutDiscount}</div>
      </div>
      {discountsArray.map((discount, index) => (
        <div>
          <div>{discount.name} :</div>
          <div>-${discount.value}</div>
        </div>
      ))}
      <div>
        <div>Order Total : </div>
        <div>{priceWithDiscount}</div>
      </div>
    </div>
  );
};

export default PriceContainer;
