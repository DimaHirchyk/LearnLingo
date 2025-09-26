import { createSlice } from "@reduxjs/toolkit";
import { logInUser, logOutUser, refreshUser, registerUser } from "./operation";

export interface AuthUser {
  name: string | null;
  email: string | null;
  token: string | null;
  userId: string | null;
}

export interface AuthState {
  user: AuthUser;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: "",
      email: "",
      userId: "",
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
          userId: action.payload.userId,
        };
        state.token = action.payload.token ?? null;
        state.isLoggedIn = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          userId: action.payload.userId,
        };
        state.token = action.payload.token ?? null;
        state.isLoggedIn = true;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = {
          name: "",
          email: "",
          userId: "",
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
          userId: action.payload.userId ?? "",
        };
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      }),
});

export default authSlice.reducer;
