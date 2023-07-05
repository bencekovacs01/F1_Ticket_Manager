import axios from 'axios';

const localhost = 'http://localhost:3002';
const vercel = 'https://f1-ticket-manager-node-js.vercel.app';
const domain = vercel;

export const _NODE_Init = async () => {
  try {
    return await axios.get(`${domain}/`);
  } catch (error) {
    console.error(error);
  }
};

export const _NODE_GenerateKeyPair = async ({ userId }) => {
  if (!userId || userId.length === 0) {
    console.log('userId is empty!');
    return;
  }
  try {
    return await axios.post(`${domain}/generateKeyPair`, {
      userId,
    });
  } catch (error) {
    console.error(error);
    return -1;
  }
};

export const _NODE_Encrypt = async ({ userId, data }) => {
  if (!userId || userId.length === 0 || !data || data?.length === 0) {
    console.log('userId OR data is empty!');
    return;
  }
  try {
    return await axios.post(`${domain}/encrypt`, {
      userId,
      data,
    });
  } catch (error) {
    console.error(error);
    return -1;
  }
};

export const _NODE_Decrypt = async ({ userId, circuitId, uid, pin }) => {
  try {
    return await axios.post(`${domain}/decrypt`, {
      userId,
      circuitId,
      uid,
      pin,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const _NODE_ChangePin = async ({ userId, data, circuitId, uid }) => {
  if (!userId || userId.length === 0 || !data || data?.length === 0) {
    console.log('userId OR data OR circuitId is empty!');
    return;
  }
  try {
    return await axios.post(`${domain}/change-pin`, {
      circuitId,
      userId,
      data,
      uid,
    });
  } catch (error) {
    console.error(error);
    return -1;
  }
};
