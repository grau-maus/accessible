// constants
const EDIT_USER = 'session/EDIT_USER';
const GET_USERS = 'session/GET_USERS';
const DELETE_USER = 'session/DELETE_USER';

const getUsers = (users) => ({
  type: GET_USERS,
  payload: users
});

// thunks
export const getAllUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/');
  if (response.ok) {
    const data = await response.json();
    await dispatch(getUsers(data.users))
  } else {
    return { error: 'error' }
  }
};

export const addEditUser = ({
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
      firstName,
      lastName,
      email,
      role,
      password
    })
  });

  const data = await response.json();

  return data;
};

const initialState = { userList: null };

// reducer
export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_USERS:
      newState = Object.assign({}, state);
      newState.userList = action.payload;

      return newState;
    default:
      return state;
  }
}
