import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const authenticate = createAsyncThunk("AUTH_USER", async () => {
  try {
    const response = await fetch("/api/auth/", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error("Error authenticating user:", err);
  }
});

export const login = createAsyncThunk("LOGIN_USER", async (params) => {
  try {
    const { email, password } = params;
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    return data;
  } catch (err) {
    console.error("Error logging user in:", err);
  }
});

export const signUp = createAsyncThunk(
  "SIGNUP_USER",
  async (username, email, password) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error("Error signing user up:", err);
    }
  }
);

export const logout = createAsyncThunk("REMOVE_USER", async () => {
  try {
    await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error logging user out:", err);
  }
});

const initialState = { user: null };

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authenticate.fulfilled, (state, action) => {
      const data = action.payload.id ? action.payload : null;
      return { ...state, user: data };
    })
    .addCase(login.fulfilled, (state, action) => {
      const data = action.payload.id ? action.payload : null;
      return { ...state, user: data };
    })
    .addCase(signUp.fulfilled, (state, action) => {
      const data = action.payload.id ? action.payload : null;
      return { ...state, user: data };
    })
    .addCase(logout.fulfilled, (state, action) => {
      return { user: null };
    })
    .addDefaultCase((state) => state);
});

export default reducer;
