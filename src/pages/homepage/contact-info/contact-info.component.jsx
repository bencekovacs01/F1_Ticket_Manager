import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomButton from '../../../components/custom-button/custom-button.component';
import { sendEmail } from '../../../firebase/firebase.utils';
import { selectCurrentUser } from '../../../redux/user/user.selectors';

import './contact-info.styles.scss';

const ContactInfo = ({ currentUser }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Sending email...');
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    sendEmail(false, email, message, currentUser?.displayName);
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-info">
      {/* <div className="info-item">
        <i className="fas fa-envelope"></i>
        <span>example@example.com</span>
      </div>
      <div className="info-item">
        <i className="fas fa-phone"></i>
        <span>(123) 456-7890</span>
      </div>
      <div className="info-item">
        <i className="fas fa-map-marker-alt"></i>
        <span>123 Main St, Anytown, USA</span>
      </div> */}
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Send us a message</h2>
        <div className="form-group">
          <label htmlFor="email">Your email address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <CustomButton inverted className="button" type="submit">
          Send
        </CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ContactInfo);
