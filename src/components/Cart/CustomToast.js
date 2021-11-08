import React from 'react';
import './CustomToast.css';

const CustomToast = (props) => {
  const { toastItems } = props;

  return (
    <div className='toastMain'>
      {toastItems.map((item, index) => (
        <div className='toastMessage' key={index}>
          <hr className='toastTimer' />
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
};
export default CustomToast;
