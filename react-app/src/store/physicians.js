import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

export const clearPhysicianState = createAction("CLEAR_PHYSICIAN_STATE");

export const addEditPhysician = createAsyncThunk(
  "EDIT_PHYSICIAN",
  async (params) => {
    try {
      const {
        fetchType,
        physicianId,
        name,
        efax,
        address,
        phoneNumber,
        npiNumber,
      } = params;
      const response = await fetch("/api/mcps/", {
        method: `${fetchType}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mcpId: physicianId,
          mcpName: name,
          efax,
          address,
          phoneNumber,
          npiNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { data, fetchType };
      }
    } catch (err) {
      console.error("Error editing physician:", err);
    }
  }
);

export const getAllPhysicians = createAsyncThunk("GET_PHYSICIANS", async () => {
  try {
    const response = await fetch("/api/mcps/");

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error("Error getting physicians:", err);
  }
});

export const removePhysician = createAsyncThunk(
  "DELETE_PHYSICIAN",
  async (physicianId) => {
    try {
      const response = await fetch("/api/mcps/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mcpId: physicianId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error("Error removing physician:", err);
    }
  }
);

const initialState = { physicianList: [] };

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addEditPhysician.fulfilled, (state, action) => {
      const { data, fetchType } = action.payload;

      if (fetchType === "PATCH") {
        const physicianId = data.id;
        const physicianList = state.physicianList.map((physicianEle) => {
          if (physicianEle.id === physicianId) {
            return { ...data };
          }

          return physicianEle;
        });

        return { ...state, physicianList };
      }

      return state;
    })
    .addCase(getAllPhysicians.fulfilled, (state, action) => {
      const data = action.payload;
      const physicianList = Object.values(data);
      return { ...state, physicianList };
    })
    .addCase(removePhysician.fulfilled, (state, action) => {
      const { physicianId } = action.payload;
      const physicianList = state.physicianList.filter(
        (physicianEle) => physicianEle.id !== physicianId
      );

      return { ...state, physicianList };
    })
    .addCase(clearPhysicianState, (state, action) => {
      return initialState;
    })
    .addDefaultCase((state) => state);
});

export default reducer;
