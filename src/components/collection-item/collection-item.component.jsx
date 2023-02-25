import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './collection-item.styles.scss';
import { withRouter } from 'react-router-dom';

const CollectionItem = ({ item, history, match }) => {
  const { circuitId, url, round } = item;
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${url})` }} />
      <CustomButton
        className="custom-button"
        onClick={() => history.push(`${match.url}/${round}`)}
        inverted
      >
        Browse tickets
      </CustomButton>
    </div>
  );
};

export default withRouter(CollectionItem);
