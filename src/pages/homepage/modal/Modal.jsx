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
              This website is made as thesis for
              <a href="https://sapientia.ro/en">
                &nbsp; Sapientia Hungarian University of Transylvania, Romania.
              </a>
            </p>
            <p>
              The only purpose of this website is to imitate the process of
              buying and validating tickets for Formula 1® Grand Prix weekends!
              I do not claim that the tickets bought on this website are
              official, thus they cannot be used!
            </p>
            <p>
              For buying official tickets please visit&nbsp;
              <a href="https://f1experiences.com">https://f1experiences.com/</a>
              &nbsp;or any related official sources!
            </p>
            <p>
              All rights reserved by QuintEvents International and Formula One
              Digital Media Limited.
            </p>
            <p>
              By clicking 'Understood' you claim that you read and understood
              all the information above and this window will not appear again!
            </p>
            <p>Enjoy surfing the website! 😃</p>
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
