import * as taskAction from "../actions/taskAction";

const INITIAL_STATE = {
  tasks: [],
  current_task: {},
  userOnTask: [],
  error: "",
  success: "",
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case taskAction.GET_ALL_TASKS:
      return { ...state, tasks: payload.tasks, error: "" };
    case taskAction.GET_TASK_INFO:
      return { ...state, current_task: payload.task };
    case taskAction.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload.task],
        success: payload.msg,
        error: "",
      };
    case taskAction.ERROR_TASK:
      return { ...state, error: payload.msg, success: "" };
    case taskAction.ADD_USER_ON_TASK:
      return { ...state, error: "", success: "User Added to Task" };
    case taskAction.CLEAR_ERROR_MSG:
      return { ...state, error: "", success: "" };
    default:
      return state;
  }
}
