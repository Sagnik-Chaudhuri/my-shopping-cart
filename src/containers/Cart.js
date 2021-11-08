import React, { useEffect, useState } from 'react';
import { Item, PricingSummaryBox, CustomToast } from '../components/Cart';

import * as constants from '../constants/index';
import './Cart.css';

const Cart = () => {
  const [cartState, setCartState] = useState(constants.initialCartState);
  const [discounts, setDiscounts] = useState([]);
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);
  const [priceWithoutDiscount, setPriceWithoutDiscount] = useState(0);
  const [toastItems, setToastItems] = useState([]);

  useEffect(() => {
    const discountObject = cartState.reduce(
      (discounts, item) => {
        let itemTypeDiscount = 0;
        if (item.type === constants.fictionTypeDiscountName) {
          itemTypeDiscount =
            (item.price - (item.price * item.discount) / 100) * 0.15 * item.quantity;
          discounts = {
            ...discounts,
            typeDiscountValue: discounts.typeDiscountValue + itemTypeDiscount,
          };
        }
        return {
          ...discounts,
          normalDiscountValue:
            discounts.normalDiscountValue + ((item.price * item.discount) / 100) * item.quantity,
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
    const updatedDiscountsArray = discountsArray.filter((discount) => discount.value != 0);
    setDiscounts(updatedDiscountsArray);
  }, [cartState]);

  useEffect(() => {
    const cartPriceWithoutDiscount = cartState.reduce(
      (priceSum, item) => (priceSum += item.price * item.quantity),
      0,
    );
    setPriceWithoutDiscount(cartPriceWithoutDiscount);
    const cartPriceWithDiscount = discounts.reduce(
      (sum, discount) => (sum -= discount.value),
      cartPriceWithoutDiscount,
    );
    setPriceWithDiscount(cartPriceWithDiscount);
  }, [discounts]);

  const clearToast = (id) => {
    setToastItems((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
  };

  const pushToToast = (message) => {
    setToastItems((prevState) => {
      setTimeout(() => {
        clearToast(prevState.length + 1);
      }, constants.toastTimerInMs);
      return [
        ...prevState,
        {
          message,
          id: prevState.length + 1,
        },
      ];
    });
  };

  return (
    <>
      <CustomToast toastItems={toastItems} />
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
                id={item.id}
                cartState={cartState}
                pushToToast={pushToToast}
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
    </>
  );
};

export default Cart;
