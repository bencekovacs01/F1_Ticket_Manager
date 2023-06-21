import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import './App.css';

import CheckoutPage from './pages/checkout/checkout.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

// import { addCollectionAndDocuments } from './firebase/firebase.utils';
import NotFoundPage from './pages/404-not-found/404-not-found.component';
import ModalWindow from './pages/homepage/modal/ModalWindow';
import ProfilePage from './pages/profile/profile.component';
import QrScannerPage from './pages/qr-scanner/qr-scanner-page.component';
import { fetchCollectionsStart } from './redux/shop/shop.actions';

// import CIRCUIT_DATA from './redux/shop/shop.data.circuits';

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession, fetchCollectionsStart /*, collectionsArray*/ } =
      this.props;
    checkUserSession();
    fetchCollectionsStart();

    // console.log('DATA');
    // console.log(CIRCUIT_DATA.circuits);

    // collectionsArray[0].forEach(element => {
    //   console.log(element.packages[1]);
    // });
    // addCollectionAndDocuments('Circuits', CIRCUIT_DATA.circuits);
  }

  render() {
    return (
      <div>
        <div className="attentionBox">
          <ModalWindow />
        </div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/schedule" component={ShopPage} />
          <Route
            exact
            path="/checkout"
            render={() =>
              this.props.currentUser ? (
                <CheckoutPage />
              ) : (
                <Redirect
                  to={
                    window.location.pathname.split('/').pop() != 'checkout' &&
                    window.history.length > 1
                      ? window.history.back()
                      : '/'
                  }
                />
              )
            }
          />
          <Route
            path="/scan"
            render={() =>
              this.props.currentUser?.id !== 'pHkSuunfIaXudY27iKvtzorCWkf1' ? (
                <Redirect
                  to={
                    window.location.pathname.split('/').pop() != 'signin' &&
                    window.history.length > 1
                      ? window.history.back()
                      : '/'
                  }
                />
              ) : (
                <QrScannerPage />
              )
            }
          />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect
                  to={
                    window.location.pathname.split('/').pop() != 'signin' &&
                    window.history.length > 1
                      ? window.history.back()
                      : '/'
                  }
                />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route
            path="/profile"
            render={() =>
              this.props.currentUser ? (
                <ProfilePage />
              ) : (
                <Redirect
                  to={window.history.length > 1 ? window.history.back() : '/'}
                />
              )
            }
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
