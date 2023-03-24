import React, { useEffect, useState } from 'react';

import './email-popup.styles.scss';

import CustomButton from '../../custom-button/custom-button.component';
import FormInput from '../../form-input/form-input.component';
import { auth } from '../../../firebase/firebase.utils';

const EmailPopup = props => {
  const [email, setEmail] = useState('');
  const [loaded, setLoaded] = useState(false);
  const body = document.querySelector('body');

  useEffect(() => {
    body.classList.add('no-scroll');
    setLoaded(true);
  }, []);

  const handleSubmit = async () => {
    console.log(email);
    await auth?.currentUser?.updateEmail(email);
    // auth?.currentUser
    // console.log(auth?.currentUser?.email);
    // props.onClose();
  };

  const handleCancel = () => {
    body.classList.remove('no-scroll');
    setEmail('');
    setLoaded(false);
    props.onClose();
  };

  const handleEmailChange = event => {
    const { value } = event.target;
    setEmail(value);
  };

  return (
    <div className="blurBG">
      <div className={`email-popup ${loaded ? 'loaded' : ''}`}>
        {/* <form onSubmit={handleSubmit}> */}
        <label>
          Please enter your email address
          <FormInput
            name="email"
            type="email"
            value={email}
            label="Email"
            onChange={handleEmailChange}
            required
          />
        </label>
        <div className="popup-buttons">
          <CustomButton className="submit" save onClick={handleSubmit}>
            Submit
          </CustomButton>
          <CustomButton onClick={handleCancel}>Cancel</CustomButton>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default EmailPopup;
