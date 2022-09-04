import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = circuit => (
  <div className="collection-preview">
    <h1 className="title">
      {circuit.CircuitName} - {circuit.Country}
    </h1>
    <span>18 - 20 MARCH</span>
    <div className="preview">
      {<CollectionItem key={circuit.CircuitName} item={circuit} />}
    </div>
  </div>
);

export default CollectionPreview;
