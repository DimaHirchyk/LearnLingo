import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Teachers } from "./slice";

axios.defaults.baseURL = import.meta.env.VITE_TEACHER_BASE;

export const getTeachers = createAsyncThunk(
  "teachers/getTeacher",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('.json?orderBy="$key"');

      const teachersArray: Teachers[] = Object.entries(response.data || {})
        .filter(([, value]) => value !== null)
        .map(([key, value]) => ({
          ...(value as Teachers),
          id: key,
        }));

      return teachersArray;
    } catch (error: unknown) {
      let errorMessage = "Помилка реєстрації";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
