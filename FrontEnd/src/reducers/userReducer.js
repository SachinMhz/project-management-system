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
    default:
      return state;
  }
}
