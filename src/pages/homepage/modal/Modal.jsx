import React from 'react';
import styles from './Modal.module.scss';

import Cookies from 'universal-cookie';

const Modal = ({ setIsOpen }) => {
  const cookies = new Cookies();
  return (
    <>
      <div className={styles.darkBG} /* onClick={() => setIsOpen(false)} */ />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>ATTENTION</h5>
          </div>
          <div className={styles.modalContent}>
            <p>
              The only purpose of this website is to imitate the process of
              buying and validating tickets for Formula 1® Grand Prix weekends!
            </p>
            <p>
              For buying the official tickets please visit
              https://f1experiences.com/ or any related official sources!
            </p>
            <p>
              All rights reserved by QuintEvents International and Formula One
              Digital Media Limited.
            </p>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  setIsOpen(false);
                  cookies.set('modalAccepted', 'true', { path: '/' });
                }}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
