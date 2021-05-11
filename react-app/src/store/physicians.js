// constants
const EDIT_PHYSICIAN = 'session/EDIT_PHYSICIAN';
const GET_PHYSICIANS = 'session/GET_PHYSICIANS';
const DELETE_PHYSICIAN = 'session/DELETE_PHYSICIAN';

const editPhysician = (physician) => ({
  type: EDIT_PHYSICIAN,
  payload: physician
});

const getPhysicians = (physician) => ({
  type: GET_PHYSICIANS,
  payload: physician
});

const deletePhysician = (physicianId) => ({
  type: DELETE_PHYSICIAN,
  payload: physicianId
});

// thunks
export const addEditPhysician = ({
  fetchType,
  physicianId,
  name,
  efax,
  address,
  phoneNumber,
  npiNumber
}) => async (dispatch) => {
  const response = await fetch('/api/mcps/', {
    method: `${fetchType}`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mcpId: physicianId,
      mcpName: name,
      efax,
      address,
      phoneNumber,
      npiNumber
    })
  });

  const data = await response.json();

  if (fetchType === 'PATCH') {
    dispatch(editPhysician(data));
  }

  return data;
};

export const getAllPhysicians = () => async (dispatch) => {
  const response = await fetch('/api/mcps/');
  if (response.ok) {
    const data = await response.json();
    await dispatch(getPhysicians(data));
  } else {
    return { error: 'error' };
  }
};

export const removePhysician = (physicianId) => async (dispatch) => {
  const response = await fetch('/api/mcps/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mcpId: physicianId
    })
  });

  const data = await response.json();

  dispatch(deletePhysician(data.physicianId));
};

const initialState = { physicianList: null };

// reducer
export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_PHYSICIANS:
      newState = Object.assign({}, state);
      newState.physicianList = action.payload;

      return newState;
    case EDIT_PHYSICIAN:
      newState = Object.assign({}, state);
      newState.physicianList[action.payload.id] = action.payload;

      return newState;
    case DELETE_PHYSICIAN:
      newState = Object.assign({}, state);
      delete newState.physicianList[action.payload];

      return newState;
    default:
      return state;
  }
}
