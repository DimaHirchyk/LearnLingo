import { db } from "@/utils/firebase";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { onValue, ref, update } from "firebase/database";

type FavoriteTeachersList = string[];

interface ToggleFavoritePayload {
  teacherId: string;
  userId: string;
  isCurrentlyFavorite: boolean;
}

export const setFavoritesList = createAction<FavoriteTeachersList>(
  "favorites/setFavoritesList"
);
export const startListeningForFavorites = createAsyncThunk<
  () => void,
  { userId: string }
>("favorites/startListening", ({ userId }, thunkAPI) => {
  const favoritesRef = ref(db, `userFavorites/${userId}`);

  const unsubscribe = onValue(favoritesRef, (snapshot) => {
    const firebaseData = snapshot.val();

    let favoritesIds: string[] = [];
    if (firebaseData) {
      favoritesIds = Object.keys(firebaseData).filter(
        (key) => firebaseData[key] === true
      );
    }

    thunkAPI.dispatch(setFavoritesList(favoritesIds));
  });

  return unsubscribe;
});

export const toggleFavoriteDB = createAsyncThunk<
  string,
  ToggleFavoritePayload,
  { rejectValue: string }
>(
  "favorites/toggleFavoriteDB",
  async ({ teacherId, userId, isCurrentlyFavorite }, thunkAPI) => {
    try {
      const userFavoritsRef = ref(db, `userFavorites/${userId}`);
      const newValue = isCurrentlyFavorite ? null : true;
      await update(userFavoritsRef, { [teacherId]: newValue });

      return teacherId;
    } catch (err: unknown) {
      let errorMessage = "Не вдалося оновити улюблених у базі.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
