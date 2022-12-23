import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

export const clearTaskState = createAction("CLEAR_TASK_STATE");

export const addEditTask = createAsyncThunk("EDIT_TASK", async (params) => {
  try {
    const {
      fetchType,
      taskId,
      staffId,
      patientId,
      visitType,
      visitYear,
      visitMonth,
      visitDay,
      status,
    } = params;
    const response = await fetch("/api/tasks/", {
      method: `${fetchType}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId,
        staffId,
        patientId,
        visitType,
        visitYear,
        visitMonth,
        visitDay,
        status,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { data, fetchType };
    }
  } catch (err) {
    console.error("Error editing task:", err);
  }
});

export const getEveryTask = createAsyncThunk("GET_ALL_TASKS", async () => {
  try {
    const response = await fetch("/api/tasks/");

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error("Error getting tasks:", err);
  }
});

export const getSingleUserTasks = createAsyncThunk(
  "GET_USER_TASKS",
  async (userId) => {
    try {
      const response = await fetch(`/api/tasks/users/${userId}/`);

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error("Error getting user's tasks:", err);
    }
  }
);

export const getSingleTask = createAsyncThunk(
  "GET_ONE_TASK",
  async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/`);

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error("Error getting task:", err);
    }
  }
);

export const removeTask = createAsyncThunk("DELETE_TASKS", async (taskId) => {
  try {
    const response = await fetch("/api/tasks/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error("Error removing task:", err);
  }
});

const initialState = {
  taskList: [],
  userTaskList: [],
  singleTask: {},
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addEditTask.fulfilled, (state, action) => {
      const { data, fetchType } = action.payload;

      if (fetchType === "PATCH") {
        const taskId = data.id;
        const taskList = state.taskList.map((taskEle) => {
          if (taskEle.id === taskId) {
            return { ...data };
          }

          return taskEle;
        });

        return { ...state, taskList };
      }

      return state;
    })
    .addCase(getEveryTask.fulfilled, (state, action) => {
      const data = action.payload;
      const taskList = Object.values(data);
      return { ...state, taskList };
    })
    .addCase(getSingleUserTasks.fulfilled, (state, action) => {
      const data = action.payload;
      const userTaskList = Object.values(data);
      return { ...state, userTaskList };
    })
    .addCase(getSingleTask.fulfilled, (state, action) => {
      const data = action.payload;
      const singleTask = { ...data };
      return { ...state, singleTask };
    })
    .addCase(removeTask.fulfilled, (state, action) => {
      const { taskId } = action.payload;
      const taskList = state.taskList.filter(
        (taskEle) => taskEle.id !== taskId
      );

      return { ...state, taskList };
    })
    .addCase(clearTaskState, (state, action) => {
      return initialState;
    })
    .addDefaultCase((state) => state);
});

export default reducer;
