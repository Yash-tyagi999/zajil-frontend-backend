// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './RootReducer'

// const store = configureStore({
//     reducer: rootReducer,
// });

// export default store;


// reduxToolkit/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./RootReducer";


// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authMgmtSlice"], // only persist auth slice
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
