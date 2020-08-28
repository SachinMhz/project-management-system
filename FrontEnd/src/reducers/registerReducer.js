import * as registerAction from "../actions/registerAction";
const INITIAL_STATE = {
  user: {},
  error: "",
  success: "",
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case registerAction.CREATE_NEW_USER:
      return {
        ...state,
        user: payload.user,
        error: "",
        success: payload.success,
      };
    case registerAction.ERROR_CREATE_NEW_USER:
      return { ...state, error: payload.msg };
    case registerAction.CLEAR_ERROR_MSG:
      return { ...state, error: "", success: "" };
    case registerAction.LOG_OUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
