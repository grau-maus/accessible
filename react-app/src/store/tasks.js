// constants
const EDIT_TASK = 'tasks/EDIT_TASK';
const GET_ALL_TASKS = 'tasks/GET_ALL_TASKS';
const GET_ONE_TASK = 'tasks/GET_ONE_TASK';
const GET_USER_TASKS = 'tasks/GET_USER_TASKS';
const DELETE_TASKS = 'tasks/DELETE_TASKS';

const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task
});

const getAllTasks = (tasks) => ({
  type: GET_ALL_TASKS,
  payload: tasks
});

const getOneTask = (task) => ({
  type: GET_ONE_TASK,
  payload: task
});

const getUserTasks = (tasks) => ({
  type: GET_USER_TASKS,
  payload: tasks
});

const deleteTask = (taskId) => ({
  type: DELETE_TASKS,
  payload: taskId
});

// thunks
export const addEditTask = ({
  fetchType,
  taskId,
  staffId,
  patientId,
  visitType,
  visitYear,
  visitMonth,
  visitDay,
  status
}) => async (dispatch) => {
  const response = await fetch('/api/tasks/', {
    method: `${fetchType}`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      taskId,
      staffId,
      patientId,
      visitType,
      visitYear,
      visitMonth,
      visitDay,
      status
    })
  });

  const data = await response.json();

  if (fetchType === 'PATCH') {
    dispatch(editTask(data));
  }

  return data;
};

export const getEveryTask = () => async (dispatch) => {
  const response = await fetch('/api/tasks/');
  if (response.ok) {
    const data = await response.json();
    await dispatch(getAllTasks(data));
  } else {
    return { error: 'error' };
  }
};

export const getSingleUserTasks = (userId) => async (dispatch) => {
  const response = await fetch(`/api/tasks/users/${userId}/`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(getUserTasks(data));
  } else {
    return { error: 'error' };
  }
};

export const getSingleTask = (taskId) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${taskId}/`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(getOneTask(data));
  } else {
    return { error: 'error' };
  }
};

export const removeTask = (taskId) => async (dispatch) => {
  const response = await fetch('/api/tasks/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mcpId: taskId
    })
  });

  const data = await response.json();

  dispatch(deleteTask(data.taskId));
};

const initialState = {
  taskList: null,
  userTaskList: null,
  singleTask: null
};

// reducer
export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_ALL_TASKS:
      newState = Object.assign({}, state);
      newState.taskList = action.payload;

      return newState;
    case GET_USER_TASKS:
      newState = Object.assign({}, state);
      newState.userTaskList = action.payload;

      return newState;
    case GET_ONE_TASK:
      newState = Object.assign({}, state);
      newState.singleTask = action.payload;

      return newState;
    case EDIT_TASK:
      newState = Object.assign({}, state);
      newState.taskList[action.payload.id] = action.payload;

      return newState;
    case DELETE_TASKS:
      newState = Object.assign({}, state);
      delete newState.taskList[action.payload];

      return newState;
    default:
      return state;
  }
}
