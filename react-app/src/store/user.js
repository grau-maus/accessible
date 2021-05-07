// constants
const EDIT_USER = 'session/EDIT_USER';
const GET_USER = 'session/GET_USER';
const DELETE_USER = 'session/DELETE_USER';

// thunks
export const addUser = ({
  firstName,
  lastName,
  email,
  role,
  password
}) => async (dispatch) => {
  const response = await fetch('/api/users/', {
    method: 'POST',
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
