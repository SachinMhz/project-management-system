import * as commentAction from "../actions/commentAction";

const INITIAL_STATE = {
  comments: [],
  current_comment: {},
  userOnComment: [],
  error: "",
  success: "",
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case commentAction.GET_ALL_COMMENTS_FROM_TASK:
      return { ...state, comments: payload.comments, error: "" };
    case commentAction.GET_COMMENT_INFO:
      return { ...state, current_comment: payload.comment };
    case commentAction.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, payload.comment],
        success: payload.msg,
        error: "",
      };
    case commentAction.ERROR_COMMENT:
      return { ...state, error: payload.msg, success: "" };
    case commentAction.CLEAR_ERROR_MSG:
      return { ...state, error: "", success: "" };
    default:
      return state;
  }
}