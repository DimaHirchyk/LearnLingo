import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const teacherSelector = (state: RootState) => state.teachers;
export const iteamsSelector = createSelector(
  [teacherSelector],
  (teacher) => teacher?.teacher || []
);

export const nextPageSelector = (state: RootState) => state.teachers.page;
export const errorTeacherSelector = (state: RootState) =>
  state.teachers.loading;
export const loadingTeacherSelector = (state: RootState) =>
  state.teachers.error;
