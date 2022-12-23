import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

export const clearPatientState = createAction("CLEAR_PATIENT_STATE");

export const addEditPatient = createAsyncThunk(
  "EDIT_PATIENT",
  async (params) => {
    try {
      const {
        fetchType,
        patientId,
        insuranceId,
        firstName,
        middleName,
        lastName,
        dobYear,
        dobMonth,
        dobDate,
        mrn,
        ssn,
        address,
        phoneNumber,
        active,
        authVisits,
      } = params;

      const response = await fetch("/api/patients/", {
        method: `${fetchType}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          insuranceId,
          firstName,
          middleName,
          lastName,
          dobYear,
          dobMonth,
          dobDate,
          mrn,
          ssn,
          address,
          phoneNumber,
          active,
          authVisits,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { data, fetchType };
      }
    } catch (err) {
      console.error("Error editing patient:", err);
    }
  }
);

export const getAllPatients = createAsyncThunk("GET_PATIENTS", async () => {
  try {
    const response = await fetch("/api/patients/");

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error("Error getting patients:", err);
  }
});

export const removePatient = createAsyncThunk(
  "DELETE_PATIENT",
  async (patientId) => {
    try {
      const response = await fetch("/api/patients/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error("Error removing patient:", err);
    }
  }
);

const initialState = { patientList: [] };

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addEditPatient.fulfilled, (state, action) => {
      const { data, fetchType } = action.payload;

      if (fetchType === "PATCH") {
        const patientId = data.id;
        const patientList = state.patientList.map((patientEle) => {
          if (patientEle.id === patientId) {
            return { ...data };
          }

          return patientEle;
        });

        return { ...state, patientList };
      }

      return state;
    })
    .addCase(getAllPatients.fulfilled, (state, action) => {
      const data = action.payload;
      const patientList = Object.values(data);
      return { ...state, patientList };
    })
    .addCase(removePatient.fulfilled, (state, action) => {
      const { patientId } = action.payload;
      const patientList = state.patientList.filter(
        (patientEle) => patientEle.id !== patientId
      );

      return { ...state, patientList };
    })
    .addCase(clearPatientState, (state, action) => {
      return initialState;
    })
    .addDefaultCase((state) => state);
});

export default reducer;
