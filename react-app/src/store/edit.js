// constants
const EDIT_FORM = 'edit/EDIT_FORM';

export const editForm = () => ({
  type: EDIT_FORM
});

const initialState = { editForm: false }

export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case EDIT_FORM:
      newState = Object.assign({}, state);
      newState.editForm = !state.editForm;

      return newState;
    default:
      return state;
  }
}
