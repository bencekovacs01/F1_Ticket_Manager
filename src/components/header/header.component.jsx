import React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/F1_black.svg';

import './header.styles.scss';
import '../../index.css';

// import {
//   HeaderContainer,
//   LogoContainer,
//   OptionsContainer,
//   OptionLink,
// } from './header.styles';

import { Link } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import placeholderImage from '../../assets/placeholder_picture.png';

const Header = ({ currentUser, hidden, signOutStart, hideDropdown }) => {
  // console.log(currentUser);
  useEffect(() => {
    window.onscroll = () => {
      setTimeout(() => {
        let scroll = 0;
        if (scroll >= window.scrollY && window.scrollY > 0) {
          document.getElementsByClassName('header')[0].classList.add('sticky');
        } else {
          document
            .getElementsByClassName('header')[0]
            .classList.remove('sticky');
        }
        scroll = window.scrollY;
      });
    };
  }, []);
  return (
    <div className="header">
      {/* <HeaderContainer> */}
      <Link className="logo-container" to="/">
        {/* <LogoContainer to="/"> */}
        <Logo className="logo"></Logo>
        {/* </LogoContainer> */}
      </Link>
      {/* <OptionsContainer> */}
      <div className="options">
        {/* <OptionLink to="/schedule">SCHEDULE</OptionLink> */}
        <Link
          className="option"
          to="/schedule"
          onClick={hidden ? null : hideDropdown}
        >
          SCHEDULE
        </Link>
        {/* <OptionLink to="/shop">CONTACT</OptionLink> */}
        <Link
          className="option"
          to="/contact"
          onClick={hidden ? null : hideDropdown}
        >
          CONTACT
        </Link>
        {currentUser ? (
          // <OptionLink as="div" onClick={signOutStart /*() => auth.signOut()*/}>
          //   SIGN OUT
          // </OptionLink>
          <div className="signout">
            <div className="profile">
              {currentUser.displayName}
              <img
                alt="Profile"
                className="picture"
                src={
                  currentUser.photoURL ? currentUser.photoURL : placeholderImage
                }
                referrerPolicy="no-referrer"
              />
            </div>
            <Link
              className="option"
              to="#"
              as="div"
              onClick={() => {
                signOutStart();
                hidden ? void 0 : hideDropdown();
              }}
            >
              SIGN OUT
            </Link>
          </div>
        ) : (
          // <OptionLink to="/signin">SIGN IN</OptionLink>
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        {currentUser ? <CartIcon /> : null}
        {/* </OptionsContainer> */}
      </div>
      {hidden ? null : <CartDropdown />}
      {/* </HeaderContainer> */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart()),
  hideDropdown: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
