import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';
import rootReducer from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  // middlewares.push(createLogger());
} else {
  console.log(
    '%cThis console might ONLY be used only for development and research purposes!',
    'color:green; font-size:20px'
  );
  console.log(
    '%c!!! Do not use this console unless you know what you are doing!',
    'color:red; font-size:20px'
  );
  console.log(
    '%cIf someone asked you to write commands or information in this console please DO NOT do it, because they can steal your sensitive data!',
    'color:red; font-size:20px'
  );
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
