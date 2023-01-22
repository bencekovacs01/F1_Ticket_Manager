import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// const config = {
//   apiKey: 'AIzaSyDDS18q6YRFwu5_wB62PWYll6noreHq5vU',
//   authDomain: 'crwn-db-f05eb.firebaseapp.com',
//   projectId: 'crwn-db-f05eb',
//   storageBucket: 'crwn-db-f05eb.appspot.com',
//   messagingSenderId: '323031600393',
//   appId: '1:323031600393:web:2e33212315d64f275697d8',
//   measurementId: 'G-K3TTD10B6M',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyCkV4qHipu33BRkxdWDtfNukBULHvdTsB8',
  authDomain: 'ticket-manager-46c6d.firebaseapp.com',
  projectId: 'ticket-manager-46c6d',
  storageBucket: 'ticket-manager-46c6d.appspot.com',
  messagingSenderId: '564345720934',
  appId: '1:564345720934:web:10a6d0b290bbcde8265da7',
  measurementId: 'G-SCJ42E57EL',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
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

export const getUserCart = async () => {
  const docRef = firestore.collection('users').doc(auth.currentUser.uid);
  try {
    const doc = await docRef.get();
    return await doc.data().cart.filter(item => item.quantity !== 0);
  } catch (error) {
    console.error('Error getting cart: ', error);
    return null;
  }
};

export const updateUserCart = async updates => {
  if (updates.type == null) {
    return;
  }
  console.log('TYPE');
  console.log(updates.type);
  const docRef = firestore.collection('users').doc(auth.currentUser.uid);

  try {
    const doc = await docRef.get();
    let cart = doc.data().cart || [];
    // console.log('CART:');
    // console.log(cart);
    let found = false;

    console.log('!!UPDATES:');
    console.log(updates);

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
    console.log(cart);
    console.log('CART UPDATED');
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

// firebase.initializeApp(config);
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
