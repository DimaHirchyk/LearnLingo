import { createSlice } from "@reduxjs/toolkit";
import { logInUser, logOutUser, refreshUser, registerUser } from "./operation";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: "",
      email: "",
    },
    token: null as string | null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = {
          name: "",
          email: "",
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = {
          name: action.payload.name ?? "",
          email: action.payload.email ?? "",
        };
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      }),
});

export default authSlice.reducer;
