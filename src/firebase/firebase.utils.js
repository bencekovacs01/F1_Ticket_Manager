import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getStorage } from 'firebase/storage';
import axios from 'axios';
import { decryptData, encryptData } from '../pages/checkout/crypt/crypt.utils';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'ticket-manager-46c6d.firebaseapp.com',
  projectId: 'ticket-manager-46c6d',
  storageBucket: 'ticket-manager-46c6d.appspot.com',
  messagingSenderId: '564345720934',
  appId: '1:564345720934:web:10a6d0b290bbcde8265da7',
  measurementId: 'G-SCJ42E57EL',
};

const table = `
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Smith</td>
        <td>john@example.com</td>
        <td>(555) 555-1234</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>jane@example.com</td>
        <td>(555) 555-5678</td>
      </tr>
    </tbody>
  </table>
`;

export const sendEmail = async (
  isAutoEmail,
  email,
  content,
  displayName,
  images
) => {
  const attachmentData = images.map((image, index) => ({
    name: `order${index + 1}.png`,
    content: image,
  }));

  const options = {
    method: 'POST',
    url: 'https://api.sendinblue.com/v3/smtp/email',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.REACT_APP_SENDINBLUE_API_KEY,
    },
    data: {
      sender: isAutoEmail
        ? { name: 'F1 Ticket Manager', email: 'kbence55@gmail.com' }
        : {
            name: displayName,
            email: email,
          },
      to: isAutoEmail
        ? [
            {
              email: auth?.currentUser?.email,
              displayName,
            },
          ]
        : [{ name: 'F1 Ticket Manager', email: 'kbence55@gmail.com' }],
      // textContent: content,
      textContent: `Here's the table:<br>${table}`,
      subject: isAutoEmail
        ? auth?.currentUser?.providerId
        : `Contact message from ${displayName}`,
      attachment: attachmentData,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const createUserProfileDocument = async (
  userAuth,
  additionalData,
  signUp = false
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const displayName = signUp
      ? additionalData?.displayName
      : userAuth?.displayName;
    const email =
      userAuth?.providerData[0]?.providerId === 'facebook.com'
        ? userAuth?.providerData[0].email
        : userAuth?.email;
    const photoURL = additionalData?.photoURL
      ? additionalData?.photoURL
      : userAuth.photoURL;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        cart: null,
        orders: [],
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const getUserOrders = async () => {
  const docRef = firestore.collection('users').doc(auth?.currentUser?.uid);
  try {
    const doc = await docRef.get();
    const orders = await doc?.data()?.orders;
    if (!orders || orders === []) {
      return false;
    }
    return orders;
  } catch (error) {
    console.error('Error getting orders: ', error);
    return null;
  }
};

export const getUserCart = async () => {
  const docRef = firestore.collection('users').doc(auth?.currentUser?.uid);
  try {
    const doc = await docRef.get();
    return await doc.data()?.cart?.filter(item => item.quantity !== 0);
  } catch (error) {
    console.error('Error getting cart: ', error);
    return null;
  }
};

export const checkOrders = async ({ circuitId, pin, uid }) => {
  const ordersRef = firestore
    .collection('orders')
    .doc(circuitId)
    .collection('orders');

  let result = -3;
  try {
    const snapshot = await ordersRef.get();
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.uid === uid) {
        const decryptedUID = decryptData(data.cryptedUID);
        const decyptedPin = decryptedUID.substring(decryptedUID.length - 6);
        if (decyptedPin == pin) {
          result = 1;
        } else {
          result = -1;
        }
      }
    });
    return result;
  } catch (error) {
    console.error('Error checking order: ', error);
    return -2;
  }
};

export const updatePin = async ({ circuitId, newPin, uid }) => {
  if (!newPin || !uid || newPin === '') {
    return;
  }
  const cryptedUID = encryptData(uid + newPin);

  const ordersRef = firestore
    .collection('orders')
    .doc(circuitId)
    .collection('orders');

  const querySnapshot = await ordersRef.where('uid', '==', uid).get();
  querySnapshot.forEach(async doc => {
    try {
      await doc.ref.update({
        cryptedUID: cryptedUID,
      });
    } catch (error) {
      console.error('Error updating pin: ', error);
    }
  });
};

export const addOrder = async ({ cartItems, total, images, pin }) => {
  cartItems.forEach(async item => {
    const { circuitId, type, quantity, uid } = item;
    const date = new Date();
    const cryptedUID = encryptData(uid + pin);

    const ordersRef = firestore
      .collection('orders')
      .doc(circuitId)
      .collection('orders');

    try {
      await ordersRef.add({
        uid,
        type,
        quantity,
        date,
        cryptedUID,
      });
    } catch (error) {
      console.error('Error adding order: ', error);
    }
  });

  const docRef = firestore.collection('users').doc(auth?.currentUser?.uid);
  try {
    const doc = await docRef.get();
    let orders = (await doc.data()?.orders) || [];
    orders.push({
      cartItems: [...cartItems],
      orderDate: new Date(),
      total: total,
    });
    await docRef.update({ orders: orders, cart: null });
    sendEmail(
      true,
      auth.currentUser.email,
      'QR CODE',
      auth.currentUser.displayName,
      images
    );
    if (!cartItems || cartItems.length === 0) {
      return;
    }
    return 1;
  } catch (error) {
    console.error('Error updating orders: ', error);
    return -1;
  }
};

export const updateProfilePicture = async url => {
  if (!url || url.length === 0) {
    return;
  }
  const docRef = firestore.collection('users').doc(auth?.currentUser?.uid);
  try {
    await docRef.update({ photoURL: url });
  } catch (error) {
    console.error('Error updating picture: ', error);
  }
};

export const updateProfile = async displayName => {
  if (!displayName || displayName.length === 0) {
    return;
  }
  const docRef = firestore.collection('users').doc(auth?.currentUser?.uid);
  try {
    await docRef.update({ displayName: displayName });
  } catch (error) {
    console.error('Error updating picture: ', error);
  }
};

export const updateUserCart = async updates => {
  if (!updates.type) {
    return;
  }

  const docRef = firestore.collection('users').doc(auth?.currentUser?.uid);
  try {
    const doc = await docRef.get();
    let cart = doc.data()?.cart || [];
    let found = false;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].type === updates.type) {
        found = true;
        cart[i].url = updates.url;
        if (updates.quantity === 0) {
          cart[i].quantity = 0;
        } else if (cart[i].quantity > 0) {
          cart[i].quantity += updates.quantity;
        }
        break;
      }
    }
    if (!found) {
      cart.push(updates);
    }

    cart = cart.filter(item => item.quantity > 0);
    await docRef.update({ cart });
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const convertCollectionsSnapshotToMap = collections => {
  const tranformedCollection = collections.docs.map(doc => {
    const {
      CircuitName,
      Country,
      Locality,
      url,
      circuitId,
      round,
      packages,
      Date,
    } = doc.data();

    return {
      id: doc.id,
      CircuitName,
      Country,
      Locality,
      circuitId,
      url,
      round,
      packages,
      Date,
    };
  });

  return tranformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.circuitId] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubcribe = auth.onAuthStateChanged(userAuth => {
      unsubcribe();
      resolve(userAuth);
    }, reject);
  });
};

export const storage = getStorage(firebase.initializeApp(firebaseConfig));

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const googleSignIn = () => auth.signInWithPopup(googleProvider);

export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const facebookSignIn = () => auth.signInWithPopup(facebookProvider);

export default firebase;
