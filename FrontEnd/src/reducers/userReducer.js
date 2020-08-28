import * as userAction from "../actions/userAction";
const INITIAL_STATE = {
  users: [],
  user: {},
  user_name: "",
  user_id: null,
  user_role: "",
  projectManagers: [],
  teamLeaders: [],
  engineers: [],
  error: "",
  success: "",
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
    case userAction.GET_ALL_USERS:
      return {
        ...state,
        users: payload.users,
      };
    case userAction.GET_PROJECT_MANAGERS:
      return {
        ...state,
        projectManagers: payload.users,
      };
    case userAction.GET_TEAM_LEADERS:
      return {
        ...state,
        teamLeaders: payload.users,
      };
    case userAction.GET_ENGINEERS:
      return {
        ...state,
        engineers: payload.users,
      };
    case userAction.GET_USERS_ON_PROJECT:
      return {
        ...state,
        users: payload.users,
      };
    case userAction.UPDATE_USER:
      return {
        ...state,
        user: payload.user,
        success: payload.msg,
        error: "",
      };
    case userAction.ERROR_USER:
      return {
        ...state,
        error: payload.msg,
        success: "",
      };
    case userAction.DELETE_USER:
      let newUserList = state.users.filter(
        (item) => payload.user.user_id !== item.user_id
      );
      return { ...state, users: newUserList, success: "" };
    case userAction.CLEAR_USER_ERROR:
      return {
        ...state,
        error: "",
        success: "",
      };
    default:
      return state;
  }
}
