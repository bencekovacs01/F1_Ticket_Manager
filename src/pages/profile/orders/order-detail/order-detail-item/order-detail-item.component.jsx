import React, { useEffect, useState } from 'react';

import './order-detail-item.styles.scss';
import PinPopup from '../../../../checkout/pin-popup/pin-popup.component';
import { updatePin } from '../../../../../firebase/firebase.utils';

const OrderDetailItem = ({ cartItem }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [copyClicked, setCopyClicked] = useState(false);
  const [popupClosed, setPopupClosed] = useState(false);

  const { type, url, interval, quantity, price, uid, circuitId } = cartItem;

  useEffect(() => {
    if (popupClosed) {
      setTimeout(() => {
        setCopyClicked(false);
        setPopupClosed(false);
      }, 700);
    }
  }, [popupClosed]);

  return (
    <>
      {copyClicked && (
        <PinPopup
          onClose={pin => {
            setPopupClosed(true);
            updatePin({ circuitId: circuitId, newPin: pin, uid: uid });
          }}
          curcuitId={circuitId}
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
