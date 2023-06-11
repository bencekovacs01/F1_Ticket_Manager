import React, { useState } from 'react';
import axios from 'axios';

const localhost = 'http://localhost:3002/';
const vercel = 'https://f1-ticket-manager-node-js.vercel.app/';
const domain = localhost;

const EncryptionDecryption = () => {
  const [data, setData] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const [initData, setInitData] = useState('');
  const [generateData, setGenerateData] = useState('');

  const handleInit = async () => {
    try {
      const response = await axios.get(`${domain}`);
      setInitData(response?.data?.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerate = async () => {
    try {
      const response = await axios.post(`${domain}generateKeyPair`, {
        userId: 'xrSDOA5y9BPlXrN8Qflwqq2ECei1',
      });
      setGenerateData(response?.data?.publicKey);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEncrypt = async () => {
    try {
      const response = await axios.post('http://localhost:3002/encrypt', {
        userId: 'user-id', // Replace with the authenticated user's ID
        data: data,
      });

      setEncryptedData(response.data.encryptedData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrypt = async () => {
    try {
      const response = await axios.post('http://localhost:3000/decrypt', {
        userId: 'user-id', // Replace with the authenticated user's ID
        encryptedData: encryptedData,
      });

      setDecryptedData(response.data.decryptedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Data:</h3>
      <input type="text" value={data} onChange={e => setData(e.target.value)} />

      <button onClick={handleInit}>Init</button>
      <button onClick={handleGenerate}>Generate</button>
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>

      <h3>Init:</h3>
      <p>{initData}</p>

      <h3>Generate:</h3>
      <p>{generateData}</p>

      <h3>Encrypted Data:</h3>
      <p>{encryptedData}</p>

      <h3>Decrypted Data:</h3>
      <p>{decryptedData}</p>
    </div>
  );
};

export default EncryptionDecryption;
