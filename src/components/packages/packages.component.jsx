import React from 'react';
import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';
import CustomButton from '../custom-button/custom-button.component';

import './packages.styles.scss';

const Package = ({ packages, addItem }) => {
  const items = [];
  for (let i = 0; i < packages.length; i++) {
    items.push([packages[i].name, packages[i].period]);
  }
  return (
    <div className="packages">
      {items.map(item => (
        <div className="package">
          <ul className="list-items">
            <li key={item[0]}>{item[0]}</li>
            <li key={item[1]}>{item[1]}</li>
          </ul>
          <CustomButton
            key={item.className}
            className="custom-button"
            onClick={() => addItem(item)}
          >
            ORDER!
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
