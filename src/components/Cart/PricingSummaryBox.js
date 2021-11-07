import React, { useEffect, useState } from 'react';
import './PricingSummaryBox.css';

const PricingSummaryBox = (props) => {
  const { itemsCount, priceWithoutDiscount, discountsArray, priceWithDiscount } = props;

  return (
    <div className='wrapper'>
      <p style={{ fontWeight: 'bold' }}>Total</p>
      <div className='rowItem'>
        <p>Items ({itemsCount}) :</p>
        <p> ${priceWithoutDiscount}</p>
      </div>
      {discountsArray.map((discount, index) => (
        <div className='rowItem'>
          <p>{discount.name} :</p>
          <p>-${discount.value}</p>
        </div>
      ))}
      <div className='orderTotal'>
        <p>Order Total : </p>
        <p>{priceWithDiscount}</p>
      </div>
    </div>
  );
};

export default PricingSummaryBox;
