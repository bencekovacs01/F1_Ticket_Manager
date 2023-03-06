import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = circuit => {
  const getExactMonth = monthNumber => {
    switch (monthNumber) {
      case 1:
        return 'JAN';
      case 2:
        return 'FEB';
      case 3:
        return 'MAR';
      case 4:
        return 'APR';
      case 5:
        return 'MAY';
      case 6:
        return 'JUN';
      case 7:
        return 'JUL';
      case 8:
        return 'AUG';
      case 9:
        return 'SEP';
      case 10:
        return 'OCT';
      case 11:
        return 'NOV';
      case 12:
        return 'DEC';
      default:
        return 'TBD';
    }
  };

  const start = new Date(circuit.Date.start);
  const end = new Date(circuit.Date.end);

  const displayDate = `${start.getDate()} - ${end.getDate()} ${getExactMonth(
    start.getMonth() + 1
  )}`;

  return (
    <div className={`collection-preview`}>
      <h1 className="title">{circuit.CircuitName}</h1>
      <h1 className="title2">{circuit.Country}</h1>
      <span>{displayDate}</span>
      <div className="preview">
        <CollectionItem key={circuit.CircuitName} item={circuit} />
      </div>
    </div>
  );
};

export default CollectionPreview;
