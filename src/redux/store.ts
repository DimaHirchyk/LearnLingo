import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import teacherReducer from "./teacher/slice";
import filterSlice from "./filtration/slice";
import favoritesSlice from "./favorites/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persisteAuthReducer = persistReducer(
  {
    key: "user-token",
    storage,
    whitelist: ["token"],
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    teachers: teacherReducer,
    auth: persisteAuthReducer,
    filters: filterSlice,
    favorites: favoritesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["favorites.unsubscribe"],

        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "favorites/startListening/fulfilled",
          "favorites/setUnsubscribeFunction",
        ],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
