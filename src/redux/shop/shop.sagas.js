import { takeLatest, call, all, put } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from './shop.actions';

export function* fetchCollectionsAsync() {
  yield console.log('I am fired');

  try {
    const collectionRef = firestore.collection('Circuits');
    // console.log(collectionRef);
    const snapshot = yield collectionRef.get();
    // console.log(snapshot);

    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    const finalCollectionsMap = Object.values(collectionsMap);
    finalCollectionsMap.sort((circuitA, circuitB) =>
      circuitA.round > circuitB.round ? 1 : -1
    );
    console.log(finalCollectionsMap);

    yield put(fetchCollectionsSuccess(finalCollectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
