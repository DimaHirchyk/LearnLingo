import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectVisibleTeachers = createSelector(
  (state: RootState) => state.teachers.filteredTeachers,
  (state: RootState) => state.teachers.displayLimit,
  (filteredTeachers, displayLimit) => {
    return filteredTeachers.slice(0, displayLimit);
  }
);

export const selectAllFilteredTeachers = (state: RootState) =>
  state.teachers.filteredTeachers;

export const selectDispleyLimit = (state: RootState) =>
  state.teachers.displayLimit;
