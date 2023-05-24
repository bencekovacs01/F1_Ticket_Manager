import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

const secretPass = process.env.REACT_APP_SECRET_PASS;

export const generateCode = () => {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};

export const generateUID = () => {
  return uuidv4();
};

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

// Encryption algorithm (TripleDES)
export const encryptData2 = (text, secretPass) => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const key = CryptoJS.PBKDF2(secretPass, salt, {
    keySize: 192 / 32, // TripleDES key size is 192 bits (24 bytes)
    iterations: 1000,
  });
  const iv = CryptoJS.lib.WordArray.random(64 / 8); // IV size is 64 bits (8 bytes)

  const encrypted = CryptoJS.TripleDES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const data = {
    ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    iv: iv.toString(CryptoJS.enc.Base64),
    salt: salt.toString(CryptoJS.enc.Base64),
  };
  return JSON.stringify(data);
};

// Decryption algorithm (TripleDES)
export const decryptData2 = (text, secretPass) => {
  const json = JSON.parse(text);
  const salt = CryptoJS.enc.Base64.parse(json.salt);
  const iv = CryptoJS.enc.Base64.parse(json.iv);
  const ciphertext = CryptoJS.enc.Base64.parse(json.ciphertext);

  const key = CryptoJS.PBKDF2(secretPass, salt, {
    keySize: 192 / 32, // TripleDES key size is 192 bits (24 bytes)
    iterations: 1000,
  });

  const decrypted = CryptoJS.TripleDES.decrypt(
    {
      ciphertext: ciphertext,
    },
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
};

const testData = 'Hello, world!';

const encryptionStart = performance.now();
const encryptedData = encryptData(testData, secretPass);
const encryptionEnd = performance.now();
const encryptionTime = encryptionEnd - encryptionStart;

const decryptionStart = performance.now();
const decryptedData = encryptData2(testData, secretPass);
const decryptionEnd = performance.now();
const decryptionTime = decryptionEnd - decryptionStart;

console.log(decryptedData);
console.log('Encryption time:', encryptionTime, 'ms');
console.log('Decryption time:', decryptionTime, 'ms');
