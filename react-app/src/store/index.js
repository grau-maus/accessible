import { configureStore } from "@reduxjs/toolkit";
import session from "./session";
import edit from "./edit";
import users from "./users";
import insurance from "./insurance";
import physicians from "./physicians";
import patients from "./patients";
import tasks from "./tasks";

const store = configureStore({
  reducer: {
    session,
    edit,
    users,
    insurance,
    physicians,
    patients,
    tasks,
  },
});

export default store;
