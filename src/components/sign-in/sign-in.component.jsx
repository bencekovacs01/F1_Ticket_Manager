import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions';

import { auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';
import Loader from '../loader/loader.component';

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reset_email, setResetEmail] = useState('');
  const [signInClicked, setSignInClicked] = useState(false);
  const [googleSignInClicked, setGoogleSignInClicked] = useState(false);

  const handleSubmit = async event => {
    emailSignInStart(email, password);
    setSignInClicked(false);
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
    }
  };

  const handleResetSubmit = async event => {
    await auth.sendPasswordResetEmail(reset_email);
    alert(
      "Password reset email has been sent to '" +
        reset_email +
        "'\n\n" +
        'If the email does not appear in a minute, please check your SPAM'
    );
    setSignInClicked(false);
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
        ></FormInput>
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        ></FormInput>
        <div className="buttons">
          {signInClicked ? (
            <button className="buttonload" enabled="false">
              <i className="spinner">
                <Loader />
              </i>
              Singing in...
            </button>
          ) : (
            <CustomButton
              type="submit"
              onClick={() => {
                if (email && password) {
                  handleSubmit();
                  setSignInClicked(true);
                }
              }}
            >
              Sign In
            </CustomButton>
          )}
          {/* Sign in with Google */}
          {googleSignInClicked ? (
            <button className="buttonload" enabled="false">
              <i className="spinner">
                <Loader />
              </i>
              Singing in...
            </button>
          ) : (
            <CustomButton
              type="button"
              onClick={() => {
                googleSignInStart();
                setGoogleSignInClicked(true);
              }}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          )}
        </div>
      </form>
      <form onSubmit={handleResetSubmit} autoComplete="off">
        <div className="resetPassword-main">
          <FormInput
            name="reset_email"
            type="email"
            value={reset_email}
            handleChange={handleChange}
            label="Reset email"
            required
          ></FormInput>
          <CustomButton type="submit">Forgot Password?</CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
