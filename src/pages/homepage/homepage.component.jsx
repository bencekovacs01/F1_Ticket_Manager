import React from 'react';

import './homepage.styles.scss';

import ContactInfo from './contact-info/contact-info.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { auth } from '../../firebase/firebase.utils';

import axios from 'axios';

const handleButtonClick = async () => {
  console.log('Button clicked');

  const user = auth?.currentUser;
  const domain = 'http://localhost:3003';

  const token = localStorage.getItem('token');

  try {
    const data = {
      title: 'Hello',
      description: 'Hi Im Bence',
      // Authorization: `Bearer ${token}`,
    };

    const apiHeaders = {
      Authorization: `Basic ${token}`,
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    };

    // const response = await axios.post(`${domain}/protected`, data, {
    //   // headers: apiHeaders,
    // });

    // if (response.status === 200) {
    //   const responseData = response.data;
    //   console.log('response', responseData);
    // } else {
    //   console.error('Request failed with status', response.status);
    //   return -1;
    // }

    const response = await fetch(`${domain}/protected`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('response', responseData);
    } else {
      console.error('Request failed with status', response.status);
      return -1;
    }
  } catch (error) {
    console.error(error);
    return -1;
  }

  return;
};

const HomePage = () => (
  <div className="homepage">
    <div className="welcomeMessage">
      <h1>Welcome to F1 Ticket Manager!</h1>
      <CustomButton className="upload" onClick={handleButtonClick}>
        Upload
      </CustomButton>
    </div>
    <div className="contact">
      <ContactInfo />
    </div>
  </div>
);

export default HomePage;
