import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  facebookSignInStart,
  googleSignInStart,
  /*emailSignInStart,*/
} from '../../redux/user/user.actions';

import { auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';
import Loader from '../loader/loader.component';

import { runSaga } from 'redux-saga';
import { store } from '../../redux/store';
import {
  signInWithEmail,
  signInWithFacebook,
} from '../../redux/user/user.sagas';

import GoogleLogo from '../../assets/google_logo.png';
import FacebookLogo from '../../assets/facebook_logo.png';

const SignIn = ({ googleSignInStart }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reset_email, setResetEmail] = useState('');
  const [signInClicked, setSignInClicked] = useState(false);

  const handleSubmit = async () => {
    const response = await runSaga(store, signInWithEmail, {
      email,
      password,
    }).toPromise();
    if (response === -1) setSignInClicked(false);
  };

  const handleFacebookSignIn = async () => {
    const response = await runSaga(store, signInWithFacebook).toPromise();
    // if (response === -1) setShowPopup(true);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'reset_email':
        setResetEmail(value);
        break;
      default:
        alert('Something went wrong, please try again!');
        break;
    }
  };

  const handleResetSubmit = async () => {
    await auth
      .sendPasswordResetEmail(reset_email)
      .then(
        alert(
          "Password reset email has been sent to '" +
            reset_email +
            "'\n\n" +
            'If the email does not appear in a minute, please check your SPAM'
        )
      );
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <div className="buttons">
          {signInClicked ? (
            <CustomButton type="button" className="buttonload" signin>
              <i className="spinner">
                <Loader />
              </i>
            </CustomButton>
          ) : (
            <CustomButton
              type="submit"
              onClick={() => {
                if (email && password) {
                  setSignInClicked(true);
                  handleSubmit();
                }
              }}
            >
              Sign In
            </CustomButton>
          )}
          <CustomButton
            className="google-button"
            type="button"
            onClick={() => {
              googleSignInStart();
            }}
            isGoogleSignIn
          >
            <img
              className="google-logo"
              src={GoogleLogo}
              alt="Sign in with your Google account"
            />
          </CustomButton>
          <CustomButton
            className="google-button"
            type="button"
            onClick={handleFacebookSignIn}
            isGoogleSignIn
          >
            <img
              className="google-logo"
              src={FacebookLogo}
              alt="Sign in with your Facebook account"
            />
          </CustomButton>
        </div>
      </form>
      <form onSubmit={handleResetSubmit} autoComplete="off">
        <div className="resetPassword-main">
          <FormInput
            name="reset_email"
            type="email"
            value={reset_email}
            handleChange={handleChange}
            label="Email"
            required
          />
          <CustomButton className="forgot-button" type="submit">
            Forgot Password?
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  facebookSignInStart: () => dispatch(facebookSignInStart()),
});

export default connect(null, mapDispatchToProps)(SignIn);
