import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getTeachers } from "./operation";

export type Teachers = {
  id: string;
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
  filteredTeachers: Teachers[];
  loading: boolean;
  error: boolean;
  page: number;
  currentFilters: {
    languages?: string;
    levels?: string;
    price_per_hour?: number | null;
  };
}

interface GetTeachersPayload {
  data: Teachers[];
  page: number;
}

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teacher: [],
    filteredTeachers: [],
    loading: false,
    error: false,
    page: 1,
    currentFilters: {},
  } as TeacherState,
  reducers: {
    filterTeachers(
      state,
      action: PayloadAction<{
        languages: string;
        levels: string;
        price_per_hour: number | null;
      }>
    ) {
      state.currentFilters = action.payload;
      state.filteredTeachers = state.teacher.filter((teacher) => {
        const languagesMatch = action.payload.languages
          ? teacher.languages.includes(action.payload.languages)
          : true;
        const levelsMatch = action.payload.levels
          ? teacher.levels.includes(action.payload.levels)
          : true;
        const priceMatch =
          action.payload.price_per_hour !== null
            ? teacher.price_per_hour <= action.payload.price_per_hour
            : true;
        return languagesMatch && levelsMatch && priceMatch;
      });
    },

    resetTeachers(state) {
      state.teacher = [];
      state.filteredTeachers = [];
      state.page = 1;
      state.currentFilters = {};
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

          // застосування активних фільтрів
          const { languages, levels, price_per_hour } = state.currentFilters;
          state.filteredTeachers = state.teacher.filter((teacher) => {
            const languagesMatch = languages
              ? teacher.languages.includes(languages)
              : true;
            const levelsMatch = levels ? teacher.levels.includes(levels) : true;
            const priceMatch =
              price_per_hour != null
                ? teacher.price_per_hour <= price_per_hour
                : true;
            return languagesMatch && levelsMatch && priceMatch;
          });
        }
      )

      .addCase(getTeachers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetTeachers, filterTeachers } = teacherSlice.actions;
export default teacherSlice.reducer;
