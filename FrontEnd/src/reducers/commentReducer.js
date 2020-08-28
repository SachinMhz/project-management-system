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
    case commentAction.DELETE_COMMENT:
      let newCommentList = state.comments.filter(
        (item) => payload.comment.comment_id !== item.comment_id
      );
      return { ...state, comments: newCommentList, success: "" };
    case commentAction.UPDATE_COMMENT:
      let newCommentList2 = state.comments.map((item) => {
        if (payload.comment.comment_id === item.comment_id)
          return payload.comment;
        else return item;
      });
      return {
        ...state,
        comments: newCommentList2,
        success: payload.msg,
        error: "",
      };
    case commentAction.ERROR_COMMENT:
      return { ...state, error: payload.msg, success: "" };
    case commentAction.CLEAR_ERROR_MSG:
      return { ...state, error: "", success: "" };
    case commentAction.LOG_OUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
