import React, { useState } from 'react';
// import styles from './App.module.scss';

import Modal from './Modal';
import Cookies from 'universal-cookie';

const ModalWindow = () => {
  const [_, setIsOpen] = useState(true);
  let isOpen = true;

  const cookies = new Cookies();
  if (
    cookies.getAll().modalAccepted === undefined ||
    cookies.getAll().modalAccepted === 'false'
  ) {
    isOpen = true;
  } else {
    isOpen = false;
  }
  return <main>{isOpen && <Modal setIsOpen={setIsOpen} />}</main>;
};

export default ModalWindow;
