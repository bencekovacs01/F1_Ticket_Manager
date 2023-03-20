import React, { useEffect, useState } from 'react';

import './email-popup.styles.scss';

function EmailPopup(props) {
  const [email, setEmail] = useState('');
  const [loaded, setLoaded] = useState(false);

  const body = document.querySelector('body');

  useEffect(() => {
    body.classList.add('no-scroll');
    setLoaded(true);
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    // Do something with the email address, e.g. send it to a server
    console.log(email);
    // Close the popup window
    props.onClose();
  };

  const handleCancel = () => {
    body.classList.remove('no-scroll');
    setEmail('');
    setLoaded(false);
    props.onClose();
  };

  return (
    <div className="blurBG">
      <div className={`email-popup ${loaded ? 'loaded' : ''}`}>
        <form onSubmit={handleSubmit}>
          <label>
            Please enter your email address
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmailPopup;
