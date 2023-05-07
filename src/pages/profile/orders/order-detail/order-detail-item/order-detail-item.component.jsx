import React, { useEffect, useState } from 'react';

import './order-detail-item.styles.scss';
import Popup from '../../../../../components/packages/popup/popup.component';
import PinPopup from '../../../../checkout/pin-popup/pin-popup.component';

const OrderDetailItem = ({ cartItem }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [copyClicked, setCopyClicked] = useState(false);
  const [popupClosed, setPopupClosed] = useState(false);

  const { type, url, interval, quantity, price, uid } = cartItem;

  useEffect(() => {
    if (popupClosed) {
      setTimeout(() => {
        setCopyClicked(false);
        setPopupClosed(false);
      }, 700);
    }
  }, [popupClosed]);

  const handleClosePopup = () => {
    setCopyClicked(false);
  };

  return (
    <>
      {copyClicked && (
        <PinPopup
          onClose={pin => {
            setPopupClosed(true);
          }}
          uid={uid}
        />
      )}
      <div
        className="order-detail-item"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering && (
          <button
            className="hover-text"
            onClick={() => {
              setCopyClicked(true);
              // navigator.clipboard.writeText(uid);
            }}
            title="Copy uid to clipboard"
          >
            More details
          </button>
        )}
        <div className="detail-image-container">
          <img src={url} alt="item" />
        </div>
        <span className="name">{type}</span>
        <span className="quantity">
          <span className="value">{quantity}</span>
        </span>
        <span className="price">${price}</span>
        <span className="price-total">${quantity * price}</span>
        <span className="interval">{interval}</span>
      </div>
    </>
  );
};

export default OrderDetailItem;
