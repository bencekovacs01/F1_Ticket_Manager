import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

// const CollectionPreview = ({ CircuitName, ...otherProps }) => (
const CollectionPreview = circuit => (
  <div className="collection-preview">
    <h1 className="title">{circuit.CircuitName}</h1>
    <div className="preview">
      {/* {<CollectionItem key={CircuitName} item={otherProps} />} */}
      {<CollectionItem key={circuit.CircuitName} item={circuit} />}
      {/* {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))} */}
    </div>
  </div>
);

export default CollectionPreview;
