import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import { addCollectionAndDocuments } from './firebase/firebase.utils';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import ModalWindow from '../src/pages/homepage/modal/ModalWindow';

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession, collectionsArray } = this.props;
    checkUserSession();
    // addCollectionAndDocuments('Circuits', collectionsArray[0]);
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
