import CryptoJS from 'crypto-js';
import { useState } from 'react';
// import { encrypt, decrypt } from 'encrypt-rsa';

const Crypto = () => {
  const [text, setText] = useState('');
  const [screen, setScreen] = useState('encrypt');

  const [encrptedData, setEncrptedData] = useState('');
  const [decrptedData, setDecrptedData] = useState('');

  const secretPass = 'XkhZG4fW2t2W';

  // const privateKey = '-----BEGIN RSA PRIVATE KEY----- ...';
  // const publicKey = '-----BEGIN RSA PUBLIC KEY----- ...';

  // const encryptData = () => {
  //   const data = encrypt(text, publicKey);
  //   setEncryptedData(data);
  // };

  // const decryptData = () => {
  //   const data = decrypt(encryptedData, privateKey);
  //   setDecryptedData(data);
  // };

  // SHA-512
  // const encryptData = () => {
  //   const data = CryptoJS.SHA512(text + secretPass).toString();
  //   setEncrptedData(data);
  // };

  // const decryptData = () => {
  //   const data = CryptoJS.SHA512(text + secretPass);
  //   if (data.toString() === encrptedData) {
  //     setEncrptedData(text);
  //   } else {
  //     setDecrptedData('Invalid decryption');
  //   }
  // };

  // AES
  // const encryptData = () => {
  //   const data = CryptoJS.AES.encrypt(
  //     JSON.stringify(text),
  //     secretPass
  //   ).toString();

  //   setEncrptedData(data);
  // };

  // const decryptData = () => {
  //   const bytes = CryptoJS.AES.decrypt(text, secretPass);
  //   const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //   setDecrptedData(data);
  // };

  ///

  const encryptData = () => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key = CryptoJS.PBKDF2(secretPass, salt, {
      keySize: 256 / 32,
      iterations: 1000,
    });
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(text), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      tag: true,
    });

    const data = {
      ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
      iv: iv.toString(CryptoJS.enc.Base64),
      salt: salt.toString(CryptoJS.enc.Base64),
      tag: true,
    };

    setEncrptedData(JSON.stringify(data));
    console.log('Encrypted:' + JSON.stringify(data));
  };

  const decryptData = () => {
    const json = JSON.parse(text);
    const salt = CryptoJS.enc.Base64.parse(json.salt);
    const iv = CryptoJS.enc.Base64.parse(json.iv);
    const tag = /*CryptoJS.enc.Base64.parse*/ json.tag;
    const ciphertext = CryptoJS.enc.Base64.parse(json.ciphertext);

    const key = CryptoJS.PBKDF2(secretPass, salt, {
      keySize: 256 / 32,
      iterations: 1000,
    });

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: ciphertext, salt: salt, iv: iv, tag: tag },
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        tag: true,
      }
    );

    const data = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

    setDecrptedData(data);
    console.log(
      'Decrypted:' + JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
    );
  };

  ///

  const switchScreen = type => {
    setText('');
    setEncrptedData('');
    setDecrptedData('');
    setScreen(type);
  };

  const handleClick = () => {
    if (!text) return;

    if (screen === 'encrypt') encryptData();
    else decryptData();
  };

  return (
    <div className="container">
      <div>
        <button
          className="btn btn-left"
          style={{
            backgroundColor: screen === 'encrypt' ? '#5e35b1' : '#5e35b130',
          }}
          onClick={() => {
            switchScreen('encrypt');
          }}
        >
          Encrypt
        </button>

        <button
          className="btn btn-right"
          style={{
            backgroundColor: screen === 'decrypt' ? '#1e88e5' : '#1e88e530',
          }}
          onClick={() => {
            switchScreen('decrypt');
          }}
        >
          Decrypt
        </button>
      </div>

      <div className="card">
        <input
          value={text}
          onChange={({ target }) => {
            setText(target.value);
          }}
          name="text"
          type="text"
          placeholder={
            screen === 'encrypt' ? 'Enter Text' : 'Enter Encrypted Data'
          }
        />

        <button className="btn submit-btn" onClick={handleClick}>
          {screen === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>
      </div>

      {(encrptedData || decrptedData) && (
        <div className="content">
          <label>{screen === 'encrypt' ? 'Encrypted' : 'Decrypted'} Data</label>
          <p>{screen === 'encrypt' ? encrptedData : decrptedData}</p>
        </div>
      )}
    </div>
  );
};

export default Crypto;
