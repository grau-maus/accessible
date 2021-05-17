// constants
const EDIT_INSURANCE = 'insurance/EDIT_INSURANCE';
const GET_INSURANCE = 'insurance/GET_INSURANCE';
const DELETE_INSURANCE = 'insurance/DELETE_INSURANCE';

const editInsurance = (insurance) => ({
  type: EDIT_INSURANCE,
  payload: insurance
});

const getInsurance = (insurance) => ({
  type: GET_INSURANCE,
  payload: insurance
});

const deleteInsurance = (insuranceId) => ({
  type: DELETE_INSURANCE,
  payload: insuranceId
});

// thunks
export const addEditInsurance = ({
  fetchType,
  insuranceId,
  name,
  type
}) => async (dispatch) => {
  const response = await fetch('/api/insurances/', {
    method: `${fetchType}`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      insuranceId,
      name,
      type
    })
  });

  const data = await response.json();

  if (fetchType === 'PATCH') {
    dispatch(editInsurance(data));
  }

  return data;
};

export const getAllInsurance = () => async (dispatch) => {
  const response = await fetch('/api/insurances/');
  if (response.ok) {
    const data = await response.json();
    await dispatch(getInsurance(data));
  } else {
    return { error: 'error' };
  }
};

export const removeInsurance = (insuranceId) => async (dispatch) => {
  const response = await fetch('/api/insurances/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      insuranceId
    })
  });

  const data = await response.json();

  dispatch(deleteInsurance(data.insuranceId));
};

const initialState = { insuranceList: null };

// reducer
export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_INSURANCE:
      newState = Object.assign({}, state);
      newState.insuranceList = action.payload;

      return newState;
    case EDIT_INSURANCE:
      newState = Object.assign({}, state);
      newState.insuranceList[action.payload.id] = action.payload;

      return newState;
    case DELETE_INSURANCE:
      newState = Object.assign({}, state);
      delete newState.insuranceList[action.payload];

      return newState;
    default:
      return state;
  }
}
