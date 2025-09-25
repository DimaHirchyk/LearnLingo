import type { RootState } from "../store";

export const selectFilterTeachers = (state: RootState) => state.filters.options;
