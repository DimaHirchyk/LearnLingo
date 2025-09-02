import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/utils/firebase";

interface User {
  name: string;
  email: string;
  token: string;
}

export const registerUser = createAsyncThunk<
  User,
  { name: string; email: string; token?: string; password: string }, // що приймає
  { rejectValue: string }
>("auth/register", async (userData, thunkAPI) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    await updateProfile(userCredential.user, {
      displayName: userData.name,
    });

    return {
      name: userCredential.user.displayName || "",
      email: userCredential.user.email || "",
      token: await userCredential.user.getIdToken(),
    };
  } catch (err: unknown) {
    let errorMessage = "Помилка реєстрації";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

interface LoginUser {
  name: string;
  email: string;
  password: string;
  token: string;
}

export const logInUser = createAsyncThunk<
  LoginUser,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (userData, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const token = await userCredential.user.getIdToken();

    return {
      name: userCredential.user.displayName || "",
      email: userCredential.user.email || "",
      password: userData.password,
      token,
    };
  } catch (err: unknown) {
    let errorMessage = "Помилка логінізації";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const logOutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);

      return null;
    } catch (err: unknown) {
      let errorMessage = "Помилка логінізації";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
