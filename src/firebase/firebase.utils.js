import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import axios from 'axios';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'ticket-manager-46c6d.firebaseapp.com',
  projectId: 'ticket-manager-46c6d',
  storageBucket: 'ticket-manager-46c6d.appspot.com',
  messagingSenderId: '564345720934',
  appId: '1:564345720934:web:10a6d0b290bbcde8265da7',
  measurementId: 'G-SCJ42E57EL',
};

const sendEmail = async () => {
  const options = {
    method: 'POST',
    url: 'https://api.sendinblue.com/v3/smtp/email',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.REACT_APP_SENDINBLUE_API_KEY,
    },
    data: {
      sender: { name: 'F1 Ticket Manager', email: 'kbence55@gmail.com' },
      to: [
        {
          email: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
        },
      ],
      textContent: 'This is a test content',
      subject: auth?.currentUser?.providerId,
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
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
    if (!(await doc?.data()?.orders)) {
      return false;
    }
    return await doc?.data()?.orders;
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

export const addOrder = async ({ cartItems, total }) => {
  if (!cartItems || cartItems.length === 0) {
    return;
  }
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
    // sendEmail();
  } catch (error) {
    console.error('Error updating orders: ', error);
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
        } else {
          cart[i].quantity += updates.quantity;
        }
        break;
      }
    }
    if (!found) {
      cart.push(updates);
    }

    // Removing 0 quantity items
    cart = cart.filter(item => item.quantity !== 0);
    await docRef.update({ cart });
    // console.log('CART UPDATED');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const convertCollectionsSnapshotToMap = collections => {
  const tranformedCollection = collections.docs.map(doc => {
    const { CircuitName, Country, Locality, url, circuitId, round, packages } =
      doc.data();

    return {
      id: doc.id,
      CircuitName,
      Country,
      Locality,
      circuitId,
      url,
      round,
      packages,
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

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
