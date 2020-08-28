import * as tagAction from "../actions/tagAction";

const INITIAL_STATE = {
  tags: [],
  current_tag: {},
  taggedUsers: [],
  error: "",
  success: "",
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case tagAction.ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, payload.tag],
        success: payload.msg,
        error: "",
      };
    case tagAction.GET_USERS_TAGGED_ON_PROJECT:
      return {
        ...state,
        taggedUsers: payload.taggedUsers,
      };
    case tagAction.ERROR_TAG:
      return { ...state, error: payload.msg, success: "" };
    case tagAction.CLEAR_ERROR_MSG:
      return { ...state, error: "", success: "" };

    case tagAction.LOG_OUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
