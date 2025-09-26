import type { RootState } from "../store";

export const selectFavoritets = (state: RootState) => state.favorites.favorites;
