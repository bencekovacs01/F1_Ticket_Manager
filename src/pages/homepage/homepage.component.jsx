import React from 'react';

import Directory from '../../components/directory/directory.component';

import './homepage.styles.scss';

import { HomePageContainer } from './homepage.styles';

import ModalWindow from './modal/App';

const HomePage = () => (
  //  <HomePageContainer>
  <div className="homepage">
    <div className="welcomeMessage">
      <ModalWindow />

      <h1>WELCOME TO F1 Ticket Manager!</h1>
    </div>
    {/* <Directory /> */}
  </div>

  // </HomePageContainer>
);

export default HomePage;
