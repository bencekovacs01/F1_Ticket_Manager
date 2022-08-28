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
  console.log(collectionRef);

  const batch = firestore.batch();
  // const newDocRef = collectionKey.doc();
  // batch.set(newDocRef, objectToAdd);
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const tranformedCollection = collections.docs.map(doc => {
    const { CircuitName, Country } = doc.data();

    return {
      // routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      CircuitName,
      Country,
    };
  });

  return tranformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.CircuitName.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// export const convertCollectionsSnapshotToMap = collections => {
//   const tranformedCollection = collections.docs.map(doc => {
//     const { title, items } = doc.data();

//     return {
//       routeName: encodeURI(title.toLowerCase()),
//       id: doc.id,
//       title,
//       items,
//     };
//   });

//   return tranformedCollection.reduce((accumulator, collection) => {
//     accumulator[collection.title.toLowerCase()] = collection;
//     return accumulator;
//   }, {});
// };

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
