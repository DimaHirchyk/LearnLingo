import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Teachers } from "./slice";

axios.defaults.baseURL = import.meta.env.VITE_TEACHER_BASE;

const LIMIT = 4;

export const getTeachers = createAsyncThunk(
  "teachers/getTeacher",
  async (page: number = 1, thunkAPI) => {
    try {
      const start = (page - 1) * LIMIT;
      const response = await axios.get(
        `.json?orderBy="$key"&limitToFirst=${LIMIT}&startAt="${start}"`
      );

      const teachersArray: Teachers[] = Object.entries(response.data || {})
        .filter(([, value]) => value !== null)
        .map(([key, value]) => ({
          ...(value as Teachers),
          id: key,
        }));

      console.log(teachersArray);

      return { data: teachersArray, page };
    } catch (error: unknown) {
      let errorMessage = "Помилка реєстрації";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
