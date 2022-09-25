import React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';

// import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

// import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/F1_black.svg';

import './header.styles.scss';
import '../../index.css';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from './header.styles';

import { Link } from 'react-router-dom';

const Header = ({ currentUser, hidden, signOutStart }) => {
  let timeout;
  let scroll = 0;
  useEffect(() => {
    window.onscroll = () => {
      // if (timeout) {
      //   clearTimeout(timeout);
      // }
      timeout = setTimeout(() => {
        if (scroll >= window.scrollY && window.scrollY > 0) {
          document.getElementsByClassName('header')[0].classList.add('sticky'); //.classList.add('sticky');
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
        <Link className="option" to="/schedule">
          SCHEDULE
        </Link>
        {/* <OptionLink to="/shop">CONTACT</OptionLink> */}
        <Link className="option" to="/contact">
          CONTACT
        </Link>
        {currentUser ? (
          // <OptionLink as="div" onClick={signOutStart /*() => auth.signOut()*/}>
          //   SIGN OUT
          // </OptionLink>
          <Link
            className="option"
            as="div"
            onClick={signOutStart /*() => auth.signOut()*/}
          >
            SIGN OUT
          </Link>
        ) : (
          // <OptionLink to="/signin">SIGN IN</OptionLink>
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
        {/* </OptionsContainer> */}
      </div>
      {hidden ? null : <CartDropdown />}
      {/* </HeaderContainer> */}
    </div>
  );
};

// auto passing state!
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
