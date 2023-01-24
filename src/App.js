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

import { addCollectionAndDocuments } from './firebase/firebase.utils';
import {
  selectCollection,
  selectCollections,
  selectCollectionsForPreview,
} from './redux/shop/shop.selectors';

import CIRCUIT_DATA from './redux/shop/shop.data.circuits';

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession, collectionsArray } = this.props;
    checkUserSession();

    // console.log('DATA');
    // console.log(CIRCUIT_DATA.circuits);

    // console.log('Collections:' + collectionsArray[0]);

    // collectionsArray[0].forEach(element => {
    //   console.log(element.packages[1]);
    // });
    // addCollectionAndDocuments('Circuits', CIRCUIT_DATA.circuits);
  }

  render() {
    return (
      <div>
        {/* <div className="attentionBox">
          <ModalWindow />
        </div> */}
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/schedule" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
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