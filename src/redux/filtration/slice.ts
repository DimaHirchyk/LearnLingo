import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getFilters, type Filters } from "./operation";

interface FiltersState {
  options: {
    languages: string[];
    levels: string[];
    price_per_hour: number[];
  };
}

const initialState: FiltersState = {
  options: { languages: [], levels: [], price_per_hour: [] },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getFilters.fulfilled,
      (state, action: PayloadAction<Filters>) => {
        state.options = action.payload;
      }
    );
  },
});

export default filterSlice.reducer;
