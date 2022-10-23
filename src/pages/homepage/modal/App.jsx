import React, { useState } from 'react';
import styles from './App.module.scss';

import Modal from './Modal';

const ModalWindow = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <main>
      {/* <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
        Open Modal
      </button> */}
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </main>
  );
};

export default ModalWindow;
