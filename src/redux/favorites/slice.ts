import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { startListeningForFavorites, toggleFavoriteDB } from "./operation";
import { logOutUser } from "../auth/operation";

type FavoriteTeacherIds = string[];

interface FavoriteState {
  favorites: FavoriteTeacherIds;
  isLoading: boolean;
  error: string | null;
  unsubscribe: (() => void) | null;
}

const initialState: FavoriteState = {
  favorites: [],
  isLoading: false,
  error: null,
  unsubscribe: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    setFavoritesList: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    setUnsubscribeFunction: (
      state,
      action: PayloadAction<(() => void) | undefined>
    ) => {
      state.unsubscribe = action.payload ?? null;
    },
    // 💡 Нова дія: Видаляє функцію відписки при виході
    removeUnsubscribeFunction: (state) => {
      state.unsubscribe = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(startListeningForFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startListeningForFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.favorites = [];
      })
      .addCase(toggleFavoriteDB.fulfilled, (state, action) => {
        const teacherId = action.payload;
        const index = state.favorites.indexOf(teacherId);

        if (index !== -1) {
          state.favorites.splice(index, 1);
        } else {
          state.favorites.push(teacherId);
        }
      })
      .addCase(toggleFavoriteDB.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.favorites = [];
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const {
  setFavoritesList,
  setUnsubscribeFunction,
  removeUnsubscribeFunction,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
