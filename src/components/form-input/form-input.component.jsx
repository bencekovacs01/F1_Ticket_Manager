import React from 'react';

import './form-input.styles.scss';

import { useState } from 'react';

import ShowIcon from '../../assets/show.png';
import HideIcon from '../../assets/hide.png';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : otherProps.type;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="group">
      <input
        className="form-input"
        onChange={handleChange}
        {...otherProps}
        type={inputType}
      />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
      {otherProps.type === 'password' && (
        <button
          type="button"
          className="toggle-password-btn"
          onClick={toggleShowPassword}
        >
          {showPassword ? (
            <img className="toggle-btn" src={ShowIcon} />
          ) : (
            <img className="toggle-btn" src={HideIcon} />
          )}
        </button>
      )}
    </div>
  );
};

export default FormInput;
