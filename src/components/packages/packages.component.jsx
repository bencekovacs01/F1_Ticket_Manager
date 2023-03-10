import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

import { addItem } from '../../redux/cart/cart.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button.component';
import FeedbackForm from './feedback/feeback-form.component';

import './packages.styles.scss';
import Popup from './popup/popup.component';

const Package = ({ url, packages, addItem, currentUser }) => {
  const history = useHistory();
  const items = [];
  for (let i = 0; i < packages.length; i++) {
    items.push([packages[i].name, packages[i].period, url, packages[i].price]);
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (isPopupOpen) {
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 800);
    }
  }, [isPopupOpen]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="packages">
      {isPopupOpen && <Popup onClose={handleClosePopup} />}
      {items.map((item, index) => (
        <div key={index} className="package">
          <ul className="list-items">
            <li key={item[0]}>Ticket name: {item[0]}</li>
            <li key={item[1]}>Interval: {item[1]}</li>
            <img
              className="picture"
              key={item[2]}
              src={item[2]}
              alt="Circuit"
              hidden={true}
            />
            <li key={item[3]}>Price: ${item[3]}</li>
          </ul>
          <CustomButton
            key={item.className}
            className="custom-button"
            onClick={() => {
              currentUser
                ? addItem({
                    type: item[0],
                    interval: item[1],
                    url: item[2],
                    price: item[3],
                  })
                : alert('Please sign in first or register!');
              currentUser ? handleOpenPopup() : history.push('/signin');
            }}
            isDisabled={!currentUser}
          >
            Add to cart
          </CustomButton>
          {currentUser ? (
            <div className="feedback">
              <FeedbackForm />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Package);
