import React, { useEffect, useState } from 'react';
import './PricingSummaryBox.css';

const PricingSummaryBox = (props) => {
  const { itemsCount, priceWithoutDiscount, discountsArray, priceWithDiscount } = props;

  return (
    <div className='wrapper'>
      <p style={{ fontWeight: 'bold' }}>Total</p>
      <div className='rowItem'>
        <p>Items ({itemsCount}) :</p>
        <p> ${parseFloat(priceWithoutDiscount).toFixed(2)}</p>
      </div>
      {discountsArray.map((discount, index) => (
        <div className='rowItem' key={discount.name}>
          <p>{discount.name} :</p>
          <p>-${parseFloat(discount.value).toFixed(2)}</p>
        </div>
      ))}
      <div className='orderTotal'>
        <p>Order Total : </p>
        <p>${parseFloat(priceWithDiscount).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PricingSummaryBox;
