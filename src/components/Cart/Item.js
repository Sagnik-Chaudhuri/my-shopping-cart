import React from 'react';
import './Item.css';
// style={{ backgroundImage: `url(${image})` }}
const Item = (props) => {
  const { id, name, quantity, price, image, cartState, setCartState, pushToToast } = props;

  const handleIncrementButtonClick = (ev) => {
    const updatedCartState = cartState.map((item) => {
      return {
        ...item,
        quantity: item.id == ev.target.value ? item.quantity + 1 : item.quantity,
      };
    });
    setCartState(updatedCartState);
    window.localStorage.setItem('cartState', JSON.stringify(updatedCartState));
  };

  const handleDecrementButtonClick = (ev) => {
    const updatedCartState = cartState.map((item) => {
      return {
        ...item,
        quantity:
          item.id == ev.target.value && item.quantity > 1 ? item.quantity - 1 : item.quantity,
      };
    });
    setCartState(updatedCartState);
    window.localStorage.setItem('cartState', JSON.stringify(updatedCartState));
    const itemToUpdate = updatedCartState.find((item) => item.id == ev.target.value);
    if (itemToUpdate.quantity == 1) {
    }
  };

  const handleItemRemoveButtonClick = (ev) => {
    const updatedCartState = cartState.filter((item) => item.id != ev.target.value);
    const itemRemoved = cartState.find((item) => item.id == ev.target.value);
    setCartState(updatedCartState);
    window.localStorage.setItem('cartState', JSON.stringify(updatedCartState));
    pushToToast(`${itemRemoved.name} removed`);
  };

  return (
    <div className='itemContainer'>
      <div className='item'>
        <span style={{ backgroundImage: `url(${image})`, width: '50px', height: '50px' }} />
        <span className='itemName'>{name}</span>
        <button
          className='itemRemoveButton'
          type='button'
          onClick={(ev) => handleItemRemoveButtonClick(ev)}
          value={id}
        >
          X
        </button>
      </div>
      <div className='itemQuantityContainer'>
        <button type='button' onClick={(ev) => handleDecrementButtonClick(ev)} value={id}>
          -
        </button>
        <span>{quantity}</span>
        <button type='button' onClick={(ev) => handleIncrementButtonClick(ev)} value={id}>
          +
        </button>
      </div>
      <div>${price}</div>
    </div>
  );
};

export default Item;
