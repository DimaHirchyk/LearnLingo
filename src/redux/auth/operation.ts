import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
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

interface RefreshedUser {
  uid: string;
  email: string | null;
  name: string | null;
  displayName: string | null;
}

export const refreshUser = createAsyncThunk<
  RefreshedUser,
  void,
  { rejectValue: string }
>(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const authInstance = getAuth();

      return await new Promise<RefreshedUser>((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
          if (user) {
            unsubscribe();
            resolve({
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              displayName: user.displayName,
            });
          } else {
            unsubscribe();
            reject("Користувач не авторизований.");
          }
        });
      });
    } catch (err: unknown) {
      let errorMessage = "Помилка логінізації";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState() as {
        auth: { token: string | null };
      };
      return reduxState.auth.token !== null;
    },
  }
);
