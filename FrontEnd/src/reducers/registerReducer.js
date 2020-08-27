import * as registerAction from "../actions/registerAction";
const INITIAL_STATE = {
  user: {},
  error: "",
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case registerAction.CREATE_NEW_USER:
      return { ...state, user: payload.user, error: "" };
    case registerAction.ERROR_CREATE_NEW_USER:
      return { ...state, error: payload.msg };
    default:
      return state;
  }
}
