import React from 'react';
import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';
import CustomButton from '../custom-button/custom-button.component';

import './packages.styles.scss';

const Package = ({ url, packages, addItem }) => {
  const items = [];
  for (let i = 0; i < packages.length; i++) {
    items.push([packages[i].name, packages[i].period, url, packages[i].price]);
  }
  return (
    <div className="packages">
      {items.map(item => (
        <div className="package">
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
            onClick={() =>
              addItem({
                type: item[0],
                interval: item[1],
                url: item[2],
                price: item[3],
              })
            }
          >
            Add to cart
          </CustomButton>
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(Package);
