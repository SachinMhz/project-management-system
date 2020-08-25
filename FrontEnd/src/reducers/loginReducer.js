import * as login from "../actions/loginAction";

const INITIAL_STATE = {
  status: "not_logged_in",
  error: "",
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case login.LOGIN:
      return {
        ...state,
        status: payload.status,
        error: payload.msg,
      };
    case login.LOG_OUT:
      return { ...state, status:'logOut'};
    default:
      return state;
  }
}
