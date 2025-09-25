import type { RootState } from "../store";

export const nextPageSelector = (state: RootState) => state.teachers.page;
export const errorTeacherSelector = (state: RootState) =>
  state.teachers.loading;
export const loadingTeacherSelector = (state: RootState) =>
  state.teachers.error;

export const selectFilters = (state: RootState) =>
  state.teachers.filteredTeachers;
