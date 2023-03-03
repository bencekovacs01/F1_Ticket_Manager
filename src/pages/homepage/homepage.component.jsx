import React from 'react';

import './homepage.styles.scss';

import ContactInfo from './contact-info/contact-info.component';

const HomePage = () => (
  <div className="homepage">
    <div className="welcomeMessage">
      <h1>Welcome to F1 Ticket Manager!</h1>
    </div>
    <div className="contact">
      <ContactInfo />
    </div>
  </div>
);

export default HomePage;
