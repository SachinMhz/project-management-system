import * as projectAction from "../actions/projectAction";

const INITIAL_STATE = {
  projects: [],
  current_project: {},
  userOnProject: [],
  error: "",
  success: "",
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case projectAction.GET_ALL_PROJECTS:
      return { ...state, projects: payload.projects, error: "" };
    case projectAction.GET_PROJECT_INFO:
      return { ...state, current_project: payload.project };
    case projectAction.GET_PROJECTS_ENROLLED:
      return { ...state, projects: payload.msg };
    case projectAction.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, payload.project],
        success: payload.msg,
        error: "",
      };
    case projectAction.UPDATE_PROJECT:
      return {
        ...state,
        // projects: [...state.projects, payload.project],
        current_project: payload.project,
        success: payload.msg,
        error: "",
      };
    case projectAction.ERROR:
      return { ...state, error: payload.msg, success: "" };
    case projectAction.ERROR_PROJECT:
      return { ...state, error: payload.msg, success: "" };
    case projectAction.DELETE_PROJECT:
      let newProjectList = state.projects.filter(
        (item) => payload.project.project_id !== item.project_id
      );
      return { ...state, projects: newProjectList, success: "" };
    case projectAction.ADD_USER_ON_PROJECT:
      return { ...state, error: "", success: "User Added to Project" };
    case projectAction.CLEAR_ERROR_MSG:
      return { ...state, error: "", success: "" };
    default:
      return state;
  }
}
