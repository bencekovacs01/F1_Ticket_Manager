import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

// import { addCollectionAndDocuments } from './firebase/firebase.utils';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
import QrScannerPage from './pages/qr-scanner/qr-scanner-page.component';

// import CIRCUIT_DATA from './redux/shop/shop.data.circuits';

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession, collectionsArray } = this.props;
    checkUserSession();

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
                  to={window.history.length > 1 ? window.history.back() : '/'}
                />
              )
            }
          />
          <Route path="/contact" component={QrScannerPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect
                  to={window.history.length > 1 ? window.history.back() : '/'}
                />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
