import config from "../config";

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_PROJECT_MANAGERS = "GET_PROJECT_MANAGERS";
export const GET_TEAM_LEADERS = "GET_TEAM_LEADERS";
export const GET_ENGINEERS = "GET_ENGINEERS";
export const GET_USERS_ON_PROJECT = "GET_USERS_ON_PROJECT";
export const GET_USERS_TAGGED_ON_PROJECT = "GET_USERS_TAGGED_ON_PROJECT";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const ERROR_USER = "ERROR_USER";
export const CLEAR_USER_ERROR = "CLEAR_USER_ERROR";

export function getUserInfo(user_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.users.user + "/" + user_id,
      requestOptions
    );
    const data = await response.json();
    // data : {user_id,display_name,role,.....//msg, status}
    dispatch({
      type: GET_USER_INFO,
      payload: { ...data },
    });
  };
}

export function getAllUsers() {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.users.users,
      requestOptions
    );
    const data = await response.json();
    // data : [{user},{user}}]
    const users = data.data;

    dispatch({
      type: GET_ALL_USERS,
      payload: { users },
    });
  };
}

export function getProjectManagers(user_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.users.pm,
      requestOptions
    );
    const data = await response.json();
    // data : [{user},{user}}]
    dispatch({
      type: GET_PROJECT_MANAGERS,
      payload: { users: data },
    });
  };
}

export function getTeamLeaders(user_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.users.tm,
      requestOptions
    );
    const data = await response.json();
    // data : [{user},{user}}]
    dispatch({
      type: GET_TEAM_LEADERS,
      payload: { users: data },
    });
  };
}

export function getEngineers(user_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.users.eng,
      requestOptions
    );
    const data = await response.json();
    // data : [{user},{user}}]
    dispatch({
      type: GET_ENGINEERS,
      payload: { users: data },
    });
  };
}

export function getUsersEnrolledOnProject(project_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.users.onProject + `/${project_id}`,
      requestOptions
    );
    const data = await response.json();
    // data : [{user},{user}}]
    dispatch({
      type: GET_USERS_ON_PROJECT,
      payload: { users: data },
    });
  };
}

export function updateUser(display_name, email, role, user_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({ email, display_name, role, user_id }),
    };
    const response = await fetch(
      config.baseURL + config.endpoints.users.update,
      requestOptions
    );
    const data = await response.json();
    // data : [{user},{user}}]
    // console.log("update", data, display_name, email, role, user_id);
    console.log("update", config.baseURL + config.endpoints.users.update);
    let user = data.data;
    if (user)
      dispatch({
        type: UPDATE_USER,
        payload: { user, msg: "user updated" },
      });
    else
      dispatch({
        type: ERROR_USER,
        payload: { msg: data.msg },
      });
  };
}

export function deleteUser(user_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({ user_id }),
    };
    const response = await fetch(
      config.baseURL + config.endpoints.users.delete,
      requestOptions
    );
    const data = await response.json();

    console.log("delete", data, user_id);
    // console.log("delete", config.baseURL + config.endpoints.users.delete);
    let user = data.data;
    if (user)
      dispatch({
        type: DELETE_USER,
        payload: { user, msg: "user updated" },
      });
    else
      dispatch({
        type: ERROR_USER,
        payload: { msg: data.msg },
      });
  };
}

export function clearUserError() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_USER_ERROR,
    });
  };
}
