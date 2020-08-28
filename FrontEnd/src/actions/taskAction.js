import config from "../config";

export const GET_TASK_INFO = "GET_TASK_INFO";
export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const ADD_TASK = "ADD_TASK";
export const ERROR_TASK = "ERROR_TASK";
export const ADD_USER_ON_TASK = "ADD_USER_ON_TASK";
export const CLEAR_ERROR_MSG = "CLEAR_ERROR_MSG";

export function getAllTaskFromProject(project_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.tasks.all + `/${project_id}`,
      requestOptions
    );
    const data = await response.json();
    // data : {user_id,display_name,role,.....//msg, status}
    let tasks = data.data;
    if (tasks) {
      dispatch({
        type: GET_ALL_TASKS,
        payload: { tasks, msg: data.msg },
      });
    } else {
      dispatch({
        type: ERROR_TASK,
        payload: { msg: data.msg },
      });
    }
  };
}

export function getTaskInfo(task_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.tasks.one + `/${task_id}`,
      requestOptions
    );
    const data = await response.json();
    let task = data.data;
    // console.log("singleTask", task);
    if (task) {
      dispatch({
        type: GET_TASK_INFO,
        payload: { task },
      });
    }
  };
}

export function addTask(
  title,
  description,
  deadline,
  project_id,
  user_id,
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
        title,
        description,
        deadline,
        project_id,
        user_id: Number(user_id),
      }),
    };
    const response = await fetch(
      config.baseURL + config.endpoints.tasks.add,
      requestOptions
    );
    const data = await response.json();
    // data : {user_id,display_name,role,.....//msg, status}
    console.log("task", data);
    let task = data.data;
    if (task) {
      dispatch({
        type: ADD_TASK,
        payload: { task, msg: data.msg },
      });
      clearForm();
    } else {
      dispatch({
        type: ERROR_TASK,
        payload: { msg: data.msg },
      });
    }
  };
}

// export function addUserToTask(task_id, user_id, clearFrom) {
//   return async (dispatch) => {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: window.localStorage.getItem("token"),
//       },
//       body: JSON.stringify({ task_id, user_id }),
//     };
//     const response = await fetch(
//       config.baseURL + config.endpoints.tasks.addUser,
//       requestOptions
//     );
//     const data = await response.json();
//     // data : {user_id,display_name,role,.....//msg, status}
//     console.log("task", data);
//     let task = data.data;
//     if (task) {
//       dispatch({
//         type: ADD_USER_ON_TASK,
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

export function clearTaskError() {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR_MSG,
    });
  };
}
