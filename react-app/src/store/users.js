import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

export const clearUserState = createAction("CLEAR_USER_STATE");

export const addEditUser = createAsyncThunk("EDIT_USER", async (params) => {
  try {
    const { userId, fetchType, firstName, lastName, email, role, password } =
      params;
    const response = await fetch("/api/users/", {
      method: `${fetchType}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        firstName,
        lastName,
        email,
        role,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { data, fetchType };
    }
  } catch (err) {
    console.error("Error editing user:", err);
  }
});

export const getAllUsers = createAsyncThunk("GET_USERS", async () => {
  try {
    const response = await fetch("/api/users/");

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error("Error getting users:", err);
  }
});

export const getAllVisitingUsers = createAsyncThunk(
  "GET_VISITING_USERS",
  async () => {
    try {
      const response = await fetch("/api/users/visiting/");

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error("Error getting visiting users:", err);
    }
  }
);

export const removeUser = createAsyncThunk("DELETE_USER", async (userId) => {
  try {
    const response = await fetch("/api/users/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error("Error removing user:", err);
  }
});

const initialState = {
  userList: [],
  visitingUserList: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addEditUser.fulfilled, (state, action) => {
      const { data, fetchType } = action.payload;

      if (fetchType === "PATCH") {
        const userId = data.id;
        const userList = state.userList.map((userEle) => {
          if (userEle === userId) {
            return { ...data };
          }

          return userEle;
        });

        return { ...state, userList };
      }

      return state;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      const data = action.payload;
      const userList = Object.values(data);
      return { ...state, userList };
    })
    .addCase(getAllVisitingUsers.fulfilled, (state, action) => {
      const data = action.payload;
      const visitingUserList = Object.values(data);
      return { ...state, visitingUserList };
    })
    .addCase(removeUser.fulfilled, (state, action) => {
      const { userId } = action.payload;
      const userList = state.userList.filter(
        (userEle) => userEle.id !== userId
      );
      return { ...state, userList };
    })
    .addCase(clearUserState, (state, action) => {
      return initialState;
    })
    .addDefaultCase((state) => state);
});

export default reducer;
