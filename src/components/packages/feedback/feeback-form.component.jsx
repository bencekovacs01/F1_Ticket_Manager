import { useState } from 'react';

import './feedback.styles.scss';

const FeedbackForm = () => {
  const [rating, setRating] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [feedback, setFeedback] = useState('');

  const handleClick = i => {
    setRating(i + 1);
  };

  const handleMouseEnter = i => {
    setHoverIndex(i + 1);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  const handleFeedbackChange = e => {
    setFeedback(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Rating: ', rating);
    console.log('Feedback: ', feedback);
    setRating(-1);
    setHoverIndex(-1);
    setFeedback('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="feedback">
        <h2>Please rate your experience:</h2>
        <div className="stars-container">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="star"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(i)}
              style={{
                color:
                  i < rating
                    ? 'red'
                    : i < hoverIndex
                    ? 'orange'
                    : 'black',
              }}
            >
              &#9733;
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="feedback">Additional Feedback:</label>
        <textarea
          className="form-control"
          id="feedback"
          value={feedback}
          onChange={handleFeedbackChange}
        ></textarea>
      </div>
      <input className="submit" type="submit" value="Submit Feedback" />
    </form>
  );
};

export default FeedbackForm;
