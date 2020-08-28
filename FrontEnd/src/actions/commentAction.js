import config from "../config";

export const GET_COMMENT_INFO = "GET_COMMENT_INFO";
export const GET_ALL_COMMENTS_FROM_TASK = "GET_ALL_COMMENTS_FROM_TASK";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ERROR_COMMENT = "ERROR_COMMENT";
export const ADD_USER_ON_COMMENT = "ADD_USER_ON_COMMENT";
export const CLEAR_ERROR_MSG = "CLEAR_ERROR_MSG";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

export function getAllCommentsFromTask(task_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.comments.all + `/${task_id}`,
      requestOptions
    );
    const data = await response.json();
    // data : {user_id,display_name,role,.....//msg, status}
    console.log("comment action get all", data);
    let comments = data.data;
    if (comments) {
      dispatch({
        type: GET_ALL_COMMENTS_FROM_TASK,
        payload: { comments, msg: data.msg },
      });
    } else {
      dispatch({
        type: ERROR_COMMENT,
        payload: { msg: data.msg },
      });
    }
  };
}

export function addComment(
  task_id,
  commenter_id,
  commenter_name,
  comment_msg,
  clearForm
) {
  return async (dispatch) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        task_id: Number(task_id),
        commenter_id: Number(commenter_id),
        commenter_name,
        comment: comment_msg,
      }),
    };
    const response = await fetch(
      config.baseURL + config.endpoints.comments.add,
      requestOptions
    );
    const data = await response.json();
    // data : {user_id,display_name,role,.....//msg, status}
    let comment = data.data;
    if (comment) {
      dispatch({
        type: ADD_COMMENT,
        payload: { comment, msg: data.msg },
      });
      clearForm();
    } else {
      dispatch({
        type: ERROR_COMMENT,
        payload: { msg: data.msg },
      });
    }
  };
}

export function deleteComment(comment_id, user_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        comment_id: Number(comment_id),
        user_id: Number(user_id),
      }),
    };
    const response = await fetch(
      config.baseURL + config.endpoints.comments.delete,
      requestOptions
    );
    const data = await response.json();
    // data : {user_id,display_name,role,.....//msg, status}
    console.log(
      "comment delete",
      data,
      comment_id,
      config.baseURL + config.endpoints.comments.delete
    );
    let comment = data.data;
    if (comment) {
      dispatch({
        type: DELETE_COMMENT,
        payload: { comment, msg: data.msg },
      });
    } else {
      dispatch({
        type: ERROR_COMMENT,
        payload: { msg: data.msg },
      });
    }
  };
}

export function updateComment(comment_msg, comment_id, task_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        comment: comment_msg,
        comment_id: Number(comment_id),
      }),
    };
    const response = await fetch(
      config.baseURL + config.endpoints.comments.update,
      requestOptions
    );
    const data = await response.json();
    // data : {user_id,display_name,role,.....//msg, status}
    console.log(
      "comment-update",
      data,
      config.baseURL + config.endpoints.comments.update
    );
    let comment = data.data;
    if (comment) {
      dispatch({
        type: UPDATE_COMMENT,
        payload: { comment, msg: data.msg },
      });
      // getAllCommentsFromTask(task_id);
    } else {
      dispatch({
        type: ERROR_COMMENT,
        payload: { msg: data.msg },
      });
    }
  };
}

export function clearCommentError() {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR_MSG,
    });
  };
}
