import config from "../config";

export const GET_COMMENT_INFO = "GET_COMMENT_INFO";
export const GET_ALL_COMMENTS_FROM_TASK = "GET_ALL_COMMENTS_FROM_TASK";
export const ADD_COMMENT = "ADD_COMMENT";
export const ERROR_COMMENT = "ERROR_COMMENT";
export const ADD_USER_ON_COMMENT = "ADD_USER_ON_COMMENT";
export const CLEAR_ERROR_MSG = "CLEAR_ERROR_MSG";

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

// export function getTaskInfo(comment_id) {
//   return async (dispatch) => {
//     const requestOptions = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: window.localStorage.getItem("token"),
//       },
//     };
//     const response = await fetch(
//       config.baseURL + config.endpoints.comments.one + `/${comment_id}`,
//       requestOptions
//     );
//     const data = await response.json();
//     let comment = data.data;
//     // console.log("singleTask", comment);
//     if (comment) {
//       dispatch({
//         type: GET_COMMENT_INFO,
//         payload: { comment },
//       });
//     }
//   };
// }

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

// export function addUserToTask(comment_id, user_id, clearFrom) {
//   return async (dispatch) => {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: window.localStorage.getItem("token"),
//       },
//       body: JSON.stringify({ comment_id, user_id }),
//     };
//     const response = await fetch(
//       config.baseURL + config.endpoints.comments.addUser,
//       requestOptions
//     );
//     const data = await response.json();
//     // data : {user_id,display_name,role,.....//msg, status}
//     console.log("comment", data);
//     let comment = data.data;
//     if (comment) {
//       dispatch({
//         type: ADD_USER_ON_COMMENT,
//       });
//       clearFrom();
//     } else {
//       dispatch({
//         type: ERROR,
//         payload: { msg: data.msg },
//       });
//     }
//   };
// }

export function clearCommentError() {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR_MSG,
    });
  };
}
