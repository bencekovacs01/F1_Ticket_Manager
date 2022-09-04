import React from 'react';

import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';
import { withRouter } from 'react-router-dom';

const CollectionItem = ({ item, history, match }) => {
  const { circuitId, url, round } = item;
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${url})` }}></div>
      {/* <div className="collection-footer">
        <span className="name">{circuitId}</span>
        <span className="price">{Locality}</span>
      </div> */}
      <CustomButton
        className="custom-button"
        onClick={() => history.push(`${match.url}/${round}`)}
        // onClick={() => addItem(item)}
        inverted
      >
        Browse tickets
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  // addItem: item => dispatch(addItem(item)),
});

export default withRouter(connect(null, mapDispatchToProps)(CollectionItem));
