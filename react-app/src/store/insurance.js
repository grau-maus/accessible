import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

export const clearInsuranceState = createAction("CLEAR_INSURANCE_STATE");

export const addEditInsurance = createAsyncThunk(
  "EDIT_INSURANCE",
  async (params) => {
    try {
      const { fetchType, insuranceId, name, type } = params;
      const response = await fetch("/api/insurances/", {
        method: `${fetchType}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          insuranceId,
          name,
          type,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { data, fetchType };
      }
    } catch (err) {
      console.error("Error editing insurance:", err);
    }
  }
);

export const getAllInsurance = createAsyncThunk("GET_INSURANCE", async () => {
  try {
    const response = await fetch("/api/insurances/");

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error("Error getting insurance:", err);
  }
});

export const removeInsurance = createAsyncThunk(
  "DELETE_INSURANCE",
  async (insuranceId) => {
    try {
      const response = await fetch("/api/insurances/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          insuranceId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error("Error removing insurance:", err);
    }
  }
);

const initialState = { insuranceList: [] };

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addEditInsurance.fulfilled, (state, action) => {
      const { data, fetchType } = action.payload;

      if (fetchType === "PATCH") {
        const insuranceId = data.id;
        const insuranceList = state.insuranceList.map((insuranceEle) => {
          if (insuranceEle.id === insuranceId) {
            return { ...data };
          }

          return insuranceEle;
        });

        return { ...state, insuranceList };
      }

      return state;
    })
    .addCase(getAllInsurance.fulfilled, (state, action) => {
      const data = action.payload;
      const insuranceList = Object.values(data);
      return { ...state, insuranceList };
    })
    .addCase(removeInsurance.fulfilled, (state, action) => {
      const { insuranceId } = action.payload;
      const insuranceList = state.insuranceList.filter(
        (insuranceEle) => insuranceEle.id !== insuranceId
      );

      return { ...state, insuranceList };
    })
    .addCase(clearInsuranceState, (state, action) => {
      return initialState;
    })
    .addDefaultCase((state) => state);
});

export default reducer;
