import * as userAction from "../actions/userAction";
const INITIAL_STATE = {
  users: [],
  user_name: "",
  user_id: null,
  user_role: "",
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case userAction.GET_USER_INFO:
      return {
        ...state,
        user_name: payload.display_name,
        user_role: payload.role,
      };
    default:
      return state;
  }
}
