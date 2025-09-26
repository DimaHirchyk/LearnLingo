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
  displayLimit: number;
  currentFilters: {
    languages?: string;
    levels?: string;
    price_per_hour?: number | null;
  };
}

const LIMIT = 4;

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teacher: [],
    filteredTeachers: [],
    loading: false,
    error: false,
    displayLimit: LIMIT,
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
      state.displayLimit = LIMIT;

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
      state.displayLimit = LIMIT;
      state.currentFilters = {};
    },

    loadMore(state) {
      state.displayLimit += LIMIT;
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
        (state, action: { payload: Teachers[] }) => {
          state.loading = false;

          const existingTeacherIds = new Set(state.teacher.map((t) => t.id));
          const uniqueNewTeachers = action.payload.filter(
            (newTeacher) => !existingTeacherIds.has(newTeacher.id)
          );

          state.teacher.push(...uniqueNewTeachers);

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

          state.displayLimit = LIMIT;
        }
      )

      .addCase(getTeachers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetTeachers, filterTeachers, loadMore } = teacherSlice.actions;
export default teacherSlice.reducer;
