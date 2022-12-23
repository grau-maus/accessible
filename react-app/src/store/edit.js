import { createAction, createReducer } from "@reduxjs/toolkit";

export const editFormStatus = createAction("EDIT_FORM");

const initialState = { editForm: false };

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(editFormStatus, (state, action) => {
      const editForm = !state.editForm;
      return { ...state, editForm };
    })
    .addDefaultCase((state) => state);
});

export default reducer;
