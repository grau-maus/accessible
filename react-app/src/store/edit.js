// constants
const EDIT_USER_FORM = 'session/EDIT_USER_FORM';

export const editUserForm = () => ({
  type: EDIT_USER_FORM
});

const initialState = { editUserForm: false }

export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case EDIT_USER_FORM:
      newState = Object.assign({}, state);
      newState.editUserForm = !state.editUserForm;

      return newState;
    default:
      return state;
  }
}
