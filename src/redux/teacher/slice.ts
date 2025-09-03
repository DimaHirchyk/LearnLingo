import { createSlice } from "@reduxjs/toolkit";
import { getTeachers } from "./operation";

export type Teachers = {
  avatar_url: string;
  conditions: string[];
  experience: string;
  languages: string[];
  lesson_info: string;
  lessons_done: number;
  levels: string[];
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: TeacherReview[];
  surname: string;
};

export type TeacherReview = {
  comment: string;
  reviewer_name: string;
  reviewer_rating: number;
};

interface TeacherState {
  teacher: Teachers[];
  loading: boolean;
  error: boolean;
  page: number;
}

interface GetTeachersPayload {
  data: Teachers[];
  page: number;
}

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teacher: [],
    loading: false,
    error: false,
    page: 1,
  } as TeacherState,
  reducers: {
    resetTeacher(state) {
      state.teacher = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeachers.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        getTeachers.fulfilled,
        (state, action: { payload: GetTeachersPayload }) => {
          state.loading = false;
          if (!action.payload.page || action.payload.page === 1) {
            state.teacher = action.payload.data;
          } else {
            state.teacher.push(...action.payload.data);
          }
          state.page = action.payload.page;
        }
      )
      .addCase(getTeachers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default teacherSlice.reducer;
