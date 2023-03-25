import CryptoJS from 'crypto-js';

const secretPass = process.env.REACT_APP_SECRET_PASS;

export const encryptData = text => {
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
  return JSON.stringify(data);
};

export const decryptData = text => {
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
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};
