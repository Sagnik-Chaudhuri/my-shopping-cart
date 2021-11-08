import React, { useEffect, useState } from 'react';
import { Item, PricingSummaryBox } from '../components/Cart';

import * as constants from '../constants/index';
import './Cart.css';

const Cart = () => {
  const [cartState, setCartState] = useState(constants.initialCartState);
  const [discounts, setDiscounts] = useState([]);
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);
  const [priceWithoutDiscount, setPriceWithoutDiscount] = useState(0);

  useEffect(() => {
    const discountObject = cartState.reduce(
      (discounts, item) => {
        let itemTypeDiscount = 0;
        if (item.type === constants.fictionTypeDiscountName) {
          itemTypeDiscount = (item.price - item.discount) * 0.15;
          discounts = {
            ...discounts,
            typeDiscountValue: discounts.typeDiscountValue + itemTypeDiscount,
          };
        }
        return {
          ...discounts,
          normalDiscountValue: discounts.normalDiscountValue + item.discount,
        };
      },
      { normalDiscountValue: 0, typeDiscountValue: 0 },
    );
    if (discountObject['normalDiscountValue'] <= 0) {
      return;
    }
    const discountsArray = Object.keys(discountObject).map((discount) => {
      if (discount === 'typeDiscountValue') {
        return {
          name: 'Type discount',
          value: discountObject[discount],
        };
      }
      return {
        name: 'Discount',
        value: discountObject[discount],
      };
    });
    setDiscounts(discountsArray);
  }, [cartState]);

  useEffect(() => {
    const cartPriceWithoutDiscount = cartState.reduce(
      (priceSum, item) => (priceSum += item.price),
      0,
    );
    setPriceWithoutDiscount(cartPriceWithoutDiscount);
    const cartPriceWithDiscount = discounts.reduce(
      (sum, discount) => (sum -= discount.value),
      cartPriceWithoutDiscount,
    );
    setPriceWithDiscount(cartPriceWithDiscount);
  }, [discounts]);

  return (
    <div className='mainContainer'>
      <div className='header'>
        <h2>Order Summary</h2>
      </div>
      <div className='itemAndPricingBoxContainer'>
        <div className='itemBoxContainer'>
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
        <div className='pricingBoxContainer'>
          <PricingSummaryBox
            itemsCount={cartState.length}
            priceWithoutDiscount={priceWithoutDiscount}
            discountsArray={discounts}
            priceWithDiscount={priceWithDiscount}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
