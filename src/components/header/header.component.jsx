import React, { useState } from 'react';
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

import { Link } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import placeholderImage from '../../assets/placeholder_picture.png';
import signOutImage from '../../assets/sign_out.svg';

const Header = ({ currentUser, hidden, signOutStart, hideDropdown }) => {
  useEffect(() => {
    let scroll = 0;
    window.onscroll = () => {
      setTimeout(() => {
        const headerEl = document.getElementsByClassName('header')[0];
        if (scroll >= window.scrollY && window.scrollY > 0) {
          headerEl.classList.add('sticky');
          headerEl.style.transition = 'all 0.5s ease-in-out';
        } else {
          headerEl.classList.remove('sticky');
          headerEl.style.transition = '';
        }
        scroll = window.scrollY;
      });
    };
  }, []);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo"></Logo>
      </Link>
      <div className="options">
        <Link
          className="option"
          to="/schedule"
          onClick={hidden ? null : hideDropdown}
        >
          SCHEDULE
        </Link>
        {/* <Link
          className="option"
          to="/contact"
          onClick={hidden ? null : hideDropdown}
        >
          CONTACT
        </Link> */}
        {currentUser ? (
          <>
            <div className="profile">
              <img
                alt="Profile"
                className="picture"
                src={
                  currentUser.photoURL ? currentUser.photoURL : placeholderImage
                }
                referrerPolicy="no-referrer"
              />
              {currentUser.displayName}
              <div className="popup">
                <Link to="/profile" className="profile-link">
                  Check Profile
                </Link>
                <Link
                  className="option"
                  to="#"
                  as="div"
                  onClick={() => {
                    signOutStart();
                    hidden ? void 0 : hideDropdown();
                  }}
                >
                  <div className="signOutWrapper">
                    SIGN OUT
                    <img className="signOutImage" src={signOutImage} />
                  </div>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <div className="cartIcon">{currentUser && <CartIcon />}</div>
      </div>
      {hidden ? null : <CartDropdown />}
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
