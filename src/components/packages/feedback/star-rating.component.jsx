import React, { useState } from 'react';

import './star-rating.styles.scss';

const StarRating = () => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleMouseEnter = index => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <div className="feedback">
      <h2>Please rate your experience:</h2>
      <div className="stars-container">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="star"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            style={{ color: i <= hoverIndex ? 'yellow' : 'black' }}
          >
            &#9733;
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
