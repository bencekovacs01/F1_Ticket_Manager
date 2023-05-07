import React, { useEffect, useState } from 'react';

import './pin-popup.styles.scss';

import CustomButton from '../../../components/custom-button/custom-button.component';
import FormInput from '../../../components/form-input/form-input.component';

import GenerateIcon from '../../../assets/magic-wand.png';
import { generateCode } from '../crypt/crypt.utils';
import Popup from '../../../components/packages/popup/popup.component';

const PinPopup = ({ onClose, fromcheckout, uid }) => {
  const [pin, setPin] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [copyClicked, setCopyClicked] = useState(false);

  const body = document.querySelector('body');

  useEffect(() => {
    if (copyClicked) {
      setTimeout(() => {
        setCopyClicked(false);
      }, 800);
    }
  }, [copyClicked]);

  useEffect(() => {
    body.classList.add('no-scroll');
    setLoaded(true);
  }, []);

  const handleSubmit = () => {
    if (pin.length !== 6) {
      setError('PIN must be 6 digits');
    } else {
      body.classList.remove('no-scroll');
      setLoaded(false);
      onClose(pin);
      setPin('');
    }
  };

  const handleCancel = () => {
    body.classList.remove('no-scroll');
    setPin('');
    setLoaded(false);
    onClose();
  };

  const handlePinChange = event => {
    setError(null);
    const { value } = event.target;
    if (value.length < 7) setPin(value);
  };

  return (
    <div className="blurBG">
      <div
        className={`pin-popup ${loaded ? 'loaded' : ''}`}
        style={!fromcheckout ? { height: 'max-content' } : null}
      >
        {fromcheckout ? (
          <>
            <label className="pin-title">Please set a PIN code</label>
            <div className="disclaimer">
              <span>
                Please keep in mind that this PIN code is highly confidential,
                thus it should NOT be shared with anyone!
                <br />
                This PIN code CANNOT BE SEEN in the future but you can create a
                new one at any time in your oder details on the profile page!
              </span>
            </div>
            <div className="input-container">
              <FormInput
                id="pin"
                name="pin"
                type="number"
                value={pin}
                label="PIN"
                onChange={handlePinChange}
                title="Please enter a PIN with 4 to 6 digits"
                required
              />
              <div
                className="auto-generate-pin"
                onClick={() => {
                  setPin(generateCode());
                  setError(null);
                }}
              >
                <img
                  src={GenerateIcon}
                  title="Auto generate PIN"
                  className="auto-generate-icon"
                />
              </div>
            </div>

            <div className={`validation-error ${error ? 'loaded' : ''}`}>
              {error}
            </div>
            <div className="popup-buttons">
              <CustomButton className="submit" save onClick={handleSubmit}>
                Submit
              </CustomButton>
              <CustomButton onClick={handleCancel}>Cancel</CustomButton>
            </div>
          </>
        ) : (
          <>
            {copyClicked && <Popup message="Copied to clipboard!" />}
            <label className="ticket-detail-label">Ticket details</label>
            <label className="ticket-detail-label2">UID:</label>
            <br />
            <button
              className="ticket-detail-label3"
              onClick={() => {
                setCopyClicked(true);
                navigator.clipboard.writeText(uid);
              }}
              title="Copy to clipboard"
            >
              {uid}
            </button>
            <div className="popup-buttons">
              <CustomButton className="submit" inverted onClick={handleSubmit}>
                NEW PIN
              </CustomButton>
              <CustomButton className="cancel-button" onClick={handleCancel}>
                Cancel
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PinPopup;
