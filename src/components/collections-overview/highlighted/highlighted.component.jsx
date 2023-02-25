import React from 'react';

import './highlighted.styles.scss';

const HighlightedTrack = ({
  CircuitName,
  Country,
  StartDate,
  EndDate,
  ImageUrl,
}) => {
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

  const start = new Date(StartDate);
  const end = new Date(EndDate);

  const displayDate = `${start.getDate()} - ${end.getDate()} ${getExactMonth(
    start.getMonth() + 1
  )}`;

  return (
    <div className="highlighted">
      <div className="info">
        <div className="circuit">
          <div className="name">{CircuitName}</div>
          <div className="name">{Country}</div>
          <div className="name interval">
            Interval {'->'} {displayDate}
          </div>
        </div>
      </div>
      <div className="image" style={{ backgroundImage: `url(${ImageUrl})` }} />
    </div>
  );
};

export default HighlightedTrack;
