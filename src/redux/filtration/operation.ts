import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface Filters {
  languages: string[];
  levels: string[];
  price_per_hour: number[];
}

export const getFilters = createAsyncThunk<
  Filters,
  void,
  { rejectValue: string }
>("filters/getFilters", async (_, thunkAPI) => {
  try {
    const response = await axios.get(".json");

    const teachers = Object.values(response.data || {});

    const languagesSet = new Set<string>();
    const levelsSet = new Set<string>();
    const priceSet = new Set<number>();

    teachers.forEach((teacher: any) => {
      teacher.languages?.forEach((lang: string) => {
        languagesSet.add(lang);
      });
      teacher.levels?.forEach((levl: string) => {
        levelsSet.add(levl);
      });
      if (teacher.price_per_hour) priceSet.add(teacher.price_per_hour);
    });

    const languages = Array.from(languagesSet);
    const levels = Array.from(levelsSet);
    const price_per_hour = Array.from(priceSet);

    return { languages, levels, price_per_hour };
  } catch (err: unknown) {
    let errorMessage = "Помилка фільтрації";
    if (err instanceof Error) errorMessage = err.message;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
