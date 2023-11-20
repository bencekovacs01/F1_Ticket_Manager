import CryptoJS, { enc } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { Crypt, RSA } from 'hybrid-crypto-js';

// import JSChaCha20 from 'js-chacha20';

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

// console.log(decryptedData);
// console.log('Encryption time:', encryptionTime, 'ms');
// console.log('Decryption time:', decryptionTime, 'ms');

/////////////////////////////

// var crypt = new Crypt();
// var rsa = new RSA();

// var publicKey;
// var privateKey;
// var encrypted;
// var decrypted;

// generateKeys();

// function generateKeys() {
//   rsa.generateKeyPair(function (keyPair) {
//     publicKey = keyPair.publicKey;
//     privateKey = keyPair.privateKey;
//   });
//   setTimeout(function () {
//     console.log('publicKey', publicKey);
//     console.log('privateKey', privateKey);
//     Encryption();
//   }, 3000);
// }

// function Encryption() {
//   var entropy = 'Testing of RSA algorithm in javascript.';
//   crypt = new Crypt({
//     rsaStandard: 'RSA-OAEP',
//     aesStandard: 'AES-CBC',
//     md: 'sha512',
//     entropy: entropy,
//   });
//   var message = 'Hello world!';

//   // Create a signature with ISSUER's private RSA key
//   var signature = crypt.signature(privateKey, message);

//   // Encrypt message with RECEIVERS public RSA key and attach the signature
//   encrypted = crypt.encrypt(publicKey, message, signature);
//   console.log('encrypted', encrypted);

//   // Call the Decryption function after encryption
//   setTimeout(function () {
//     Decryption();
//   }, 3000);
// }

// function Decryption() {
//   var entropy = 'Testing of RSA algorithm in javascript.';
//   crypt = new Crypt({
//     rsaStandard: 'RSA-OAEP',
//     aesStandard: 'AES-CBC',
//     md: 'sha512',
//     entropy: entropy,
//   });

//   // Decrypt message with own (RECEIVER) private key
//   decrypted = crypt.decrypt(privateKey, encrypted);
//   console.log('decrypted', decrypted);

//   // Verify message with ISSUER's public key
//   var verified = crypt.verify(
//     publicKey,
//     decrypted.signature,
//     decrypted.message
//   );
//   console.log('verified', verified);
// }

////// CHACHA20

const convertTextToUint8Array = text => {
  const encoder = new TextEncoder();
  const encodedText = encoder.encode(text);

  // If the encoded text is longer than 64 bytes, truncate it
  if (encodedText.length > 64) {
    console.log('TOO LONG!');
    return encodedText.subarray(0, 64);
  }

  // If the encoded text is shorter than 64 bytes, pad it with zeros
  if (encodedText.length < 64) {
    const paddedText = new Uint8Array(64);
    paddedText.set(encodedText);
    return paddedText;
  }

  return encodedText;
};

const convertUint8ArrayToText = uint8Array => {
  const decoder = new TextDecoder();
  const text = decoder.decode(uint8Array);
  return text;
};

//////

const generateRandomTEXT = () => {
  const key = new Uint8Array(64);
  crypto.getRandomValues(key);
  return key;
};

// Generate a random key with 32 bytes
const generateRandomKey = () => {
  const key = new Uint8Array(32);
  crypto.getRandomValues(key);
  return key;
};

// Generate a random nonce with 12 bytes
const generateRandomNonce = () => {
  const nonce = new Uint8Array(12);
  crypto.getRandomValues(nonce);
  return nonce;
};

// Usage example:
// const key12 = generateRandomKey();
// const nonce12 = generateRandomNonce();

// const chacha20ENCYPT = (key, nonce) => {
//   const message = convertTextToUint8Array('HELLO');
//   console.log('message', message);
//   return new JSChaCha20(key, nonce).encrypt(message);
// };

// const chacha20DECYPT = (key, nonce, encrypt) => {
//   return new JSChaCha20(key, nonce).decrypt(encrypt);
// };

// const ecrypted12 = chacha20ENCYPT(key12, nonce12);
// console.log('ecrypted12', ecrypted12);
// const decrypted12 = chacha20DECYPT(key12, nonce12, ecrypted12);
// console.log('decrypted12', decrypted12);

// console.log(convertUint8ArrayToText(decrypted12));
