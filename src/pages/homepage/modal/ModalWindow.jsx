import React, { useState } from 'react';

import Modal from './Modal';
import Cookies from 'universal-cookie';

const ModalWindow = () => {
  const [_, setIsOpen] = useState(true);
  const body = document.querySelector('body');

  let isOpen = true;

  const cookies = new Cookies();
  if (
    cookies.getAll().modalAccepted === undefined ||
    cookies.getAll().modalAccepted === 'false'
  ) {
    body.classList.add('no-scroll');
    isOpen = true;
  } else {
    body.classList.remove('no-scroll');
    isOpen = false;
  }
  return <main>{isOpen && <Modal setIsOpen={setIsOpen} />}</main>;
};

export default ModalWindow;
