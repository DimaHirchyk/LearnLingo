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
import { startListeningForFavorites } from "../favorites/operation";
import {
  removeUnsubscribeFunction,
  setUnsubscribeFunction,
} from "../favorites/slice";

// Локальні типи для state
interface FavoritesState {
  unsubscribe: (() => void) | null;
}

interface AuthUser {
  name: string;
  email: string;
  userId: string;
  token?: string;
}

interface AuthState {
  user: AuthUser;
  isLoggedIn: boolean;
  isRefreshing?: boolean;
  token?: string | null;
}

interface RootStateForThunk {
  favorites: FavoritesState;
  auth: AuthState;
}

// ===== REGISTER =====
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  token?: string;
}

export const registerUser = createAsyncThunk<
  AuthUser,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (userData, thunkAPI) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const userId = userCredential.user.uid;

    await updateProfile(userCredential.user, {
      displayName: userData.name,
    });

    return {
      name: userCredential.user.displayName || "",
      email: userCredential.user.email || "",
      token: await userCredential.user.getIdToken(),
      userId,
    };
  } catch (err: unknown) {
    let errorMessage = "Помилка реєстрації";
    if (err instanceof Error) errorMessage = err.message;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// ===== LOGIN =====
interface LoginPayload {
  email: string;
  password: string;
}

export const logInUser = createAsyncThunk<
  AuthUser & { password: string },
  LoginPayload,
  { rejectValue: string; state: RootStateForThunk }
>("auth/login", async (userData, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const userId = userCredential.user.uid;

    // Запуск слухача favorites
    const unsubscribe = await thunkAPI
      .dispatch(startListeningForFavorites({ userId }))
      .unwrap();
    thunkAPI.dispatch(setUnsubscribeFunction(unsubscribe));

    const token = await userCredential.user.getIdToken();

    return {
      name: userCredential.user.displayName || "",
      email: userCredential.user.email || "",
      password: userData.password,
      token,
      userId,
    };
  } catch (err: unknown) {
    let errorMessage = "Помилка логінізації";
    if (err instanceof Error) errorMessage = err.message;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// ===== LOGOUT =====
export const logOutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string; state: RootStateForThunk }
>("auth/logout", async (_, thunkAPI) => {
  try {
    const unsubscribe = thunkAPI.getState().favorites.unsubscribe;

    if (unsubscribe) {
      unsubscribe();
      thunkAPI.dispatch(removeUnsubscribeFunction());
    }
    await signOut(auth);
  } catch (err: unknown) {
    let errorMessage = "Помилка виходу";
    if (err instanceof Error) errorMessage = err.message;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// ===== REFRESH =====
interface RefreshedUser {
  userId: string;
  email: string | null;
  name: string | null;
  displayName: string | null;
}

export const refreshUser = createAsyncThunk<
  RefreshedUser,
  void,
  { rejectValue: string; state: RootStateForThunk }
>(
  "auth/refresh",
  async (_, thunkAPI) => {
    return await new Promise<RefreshedUser>((resolve, reject) => {
      const authInstance = getAuth();

      const unsubscribeAuth = onAuthStateChanged(authInstance, async (user) => {
        unsubscribeAuth();

        if (user) {
          const userId = user.uid;

          try {
            const unsubscribeFavorites = await thunkAPI
              .dispatch(startListeningForFavorites({ userId }))
              .unwrap();

            thunkAPI.dispatch(setUnsubscribeFunction(unsubscribeFavorites));
          } catch (error) {
            console.error("Помилка при запуску слухача favorites:", error);
          }

          resolve({
            userId: user.uid,
            email: user.email,
            name: user.displayName,
            displayName: user.displayName,
          });
        } else {
          reject("Користувач не авторизований.");
        }
      });
    });
  },
  {
    condition: (_, thunkAPI) => {
      const authState = thunkAPI.getState().auth;
      return authState.token != null;
    },
  }
);
