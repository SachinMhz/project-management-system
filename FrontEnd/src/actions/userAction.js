import config from "../config";

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_PROJECT_MANAGERS = "GET_PROJECT_MANAGERS";
export const GET_TEAM_LEADERS = "GET_TEAM_LEADERS";
export const GET_ENGINEERS = "GET_ENGINEERS";
export const GET_USERS_ON_PROJECT = "GET_USERS_ON_PROJECT";

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

export function getAllUsers(user_id) {
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
    dispatch({
      type: GET_ALL_USERS,
      payload: { users: data },
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
