import config from "../config";

export const GET_PROJECT_INFO = "GET_PROJECT_INFO";
export const GET_ALL_PROJECTS = "GET_ALL_PROJECTS";
export const GET_PROJECTS_ENROLLED = "GET_PROJECTS_ENROLLED";
export const ADD_PROJECT = "ADD_PROJECT";
export const ERROR_PROJECT = "ERROR_PROJECT";
export const ERROR_ADDING_USER_ON_PROJECT = "ERROR_ADDING_USER_ON_PROJECT";
export const ADD_USER_ON_PROJECT = "ADD_USER_ON_PROJECT";
export const ERROR = "ERROR";
export const CLEAR_ERROR_MSG = "CLEAR_ERROR_MSG";

export function getAllProject() {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.projects.all,
      requestOptions
    );
    const data = await response.json();
    console.log("projectAction", data);
    // data : {user_id,display_name,role,.....//msg, status}
    dispatch({
      type: GET_ALL_PROJECTS,
      payload: { projects: data },
    });
  };
}

export function getProjectInfo(project_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.projects.one + `/${project_id}`,
      requestOptions
    );
    const data = await response.json();
    let project = data.data;
    console.log("singleProject", project);
    if (project) {
      dispatch({
        type: GET_PROJECT_INFO,
        payload: { project },
      });
    }
  };
}

export function addProject(name, description, manager_id, clearFrom) {
  return async (dispatch) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, description, manager_id }),
    };
    const response = await fetch(
      config.baseURL + config.endpoints.projects.add,
      requestOptions
    );
    const data = await response.json();
    // data : {user_id,display_name,role,.....//msg, status}
    console.log("project", data);
    let project = data.data;
    if (project) {
      dispatch({
        type: ADD_PROJECT,
        payload: { project: data, msg: data.msg },
      });
      clearFrom();
    } else {
      dispatch({
        type: ERROR_PROJECT,
        payload: { msg: data.msg },
      });
    }
  };
}

export function addUserToProject(project_id, user_id, clearFrom) {
  return async (dispatch) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({ project_id, user_id }),
    };
    const response = await fetch(
      config.baseURL + config.endpoints.projects.addUser,
      requestOptions
    );
    const data = await response.json();
    // data : {user_id,display_name,role,.....//msg, status}
    console.log("project", data);
    let project = data.data;
    if (project) {
      dispatch({
        type: ADD_USER_ON_PROJECT,
      });
      clearFrom();
    } else {
      dispatch({
        type: ERROR,
        payload: { msg: data.msg },
      });
    }
  };
}

export function clearProjectError() {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR_MSG,
    });
  };
}
