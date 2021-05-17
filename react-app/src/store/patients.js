// constants
const EDIT_PATIENT = 'patients/EDIT_PATIENT';
const GET_PATIENTS = 'patients/GET_PATIENTS';
const DELETE_PATIENT = 'patients/DELETE_PATIENT';

const editPatient = (patient) => ({
  type: EDIT_PATIENT,
  payload: patient
});

const getPatients = (patient) => ({
  type: GET_PATIENTS,
  payload: patient
});

const deletePatient = (patientId) => ({
  type: DELETE_PATIENT,
  payload: patientId
});

// thunks
export const addEditPatient = ({
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
  authVisits
}) => async (dispatch) => {
  const response = await fetch('/api/patients/', {
    method: `${fetchType}`,
    headers: {
      'Content-Type': 'application/json'
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
      authVisits
    })
  });

  const data = await response.json();

  if (fetchType === 'PATCH') {
    dispatch(editPatient(data));
  }

  return data;
};

export const getAllPatients = () => async (dispatch) => {
  const response = await fetch('/api/patients/');
  if (response.ok) {
    const data = await response.json();
    await dispatch(getPatients(data));
  } else {
    return { error: 'error' };
  }
};

export const removePatient = (patientId) => async (dispatch) => {
  const response = await fetch('/api/patients/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      patientId
    })
  });

  const data = await response.json();

  dispatch(deletePatient(data.patientId));
};

const initialState = { patientList: null };

// reducer
export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_PATIENTS:
      newState = Object.assign({}, state);
      newState.patientList = action.payload;

      return newState;
    case EDIT_PATIENT:
      newState = Object.assign({}, state);
      newState.patientList[action.payload.id] = action.payload;

      return newState;
    case DELETE_PATIENT:
      newState = Object.assign({}, state);
      delete newState.patientList[action.payload];

      return newState;
    default:
      return state;
  }
}
