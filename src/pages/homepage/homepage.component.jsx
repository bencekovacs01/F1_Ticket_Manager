import React from 'react';

import Directory from '../../components/directory/directory.component';

import './homepage.styles.scss';

import { HomePageContainer } from './homepage.styles';

import background_video from '../../assets/background_video.webm';

const HomePage = () => (
  <HomePageContainer>
    <video id="bgVideo" loop muted>
      <source src={background_video} type="video/webm" />
    </video>
    <Directory />
  </HomePageContainer>
);

export default HomePage;
