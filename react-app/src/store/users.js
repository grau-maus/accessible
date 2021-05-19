// constants
const EDIT_USER = 'users/EDIT_USER';
const GET_USERS = 'users/GET_USERS';
const GET_VISITING_USERS = 'users/GET_VISITING_USERS';
const DELETE_USER = 'users/DELETE_USER';

const editUser = (user) => ({
  type: EDIT_USER,
  payload: user
});

const getUsers = (users) => ({
  type: GET_USERS,
  payload: users
});

const getVisitingUsers = (users) => ({
  type: GET_VISITING_USERS,
  payload: users
});

const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: userId
});

// thunks
export const addEditUser = ({
  userId,
  type,
  firstName,
  lastName,
  email,
  role,
  password
}) => async (dispatch) => {
  const response = await fetch('/api/users/', {
    method: `${type}`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      firstName,
      lastName,
      email,
      role,
      password
    })
  });

  const data = await response.json();

  if (type === 'PATCH') {
    dispatch(editUser(data));
  }

  return data;
};

export const getAllUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/');
  if (response.ok) {
    const data = await response.json();
    await dispatch(getUsers(data.users));
  } else {
    return { error: 'error' };
  }
};

export const getAllVisitingUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/visiting/');
  if (response.ok) {
    const data = await response.json();
    await dispatch(getVisitingUsers(data.users));
  } else {
    return { error: 'error' };
  }
};

export const removeUser = (userId) => async (dispatch) => {
  const response = await fetch('/api/users/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId
    })
  });

  const data = await response.json();

  dispatch(deleteUser(data.userId));
};

const initialState = {
  userList: null,
  visitingUserList: null
};

// reducer
export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_USERS:
      newState = Object.assign({}, state);
      newState.userList = action.payload;

      return newState;
    case GET_VISITING_USERS:
      newState = Object.assign({}, state);
      newState.visitingUserList = action.payload;

      return newState;
    case EDIT_USER:
      newState = Object.assign({}, state);
      newState.userList[action.payload.id] = action.payload;

      return newState;
    case DELETE_USER:
      newState = Object.assign({}, state);
      delete newState.userList[action.payload];

      return newState;
    default:
      return state;
  }
}
