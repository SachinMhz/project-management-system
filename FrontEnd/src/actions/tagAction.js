import config from "../config";

export const ADD_TAG = "ADD_TAG";
export const ERROR_TAG = "ERROR_TAG";
export const GET_USERS_TAGGED_ON_PROJECT = "GET_USERS_TAGGED_ON_PROJECT";
export const CLEAR_ERROR_MSG = "CLEAR_ERROR_MSG";

export function addTag(task_id, tagged_id, tagger_id, clearForm) {
  let current_user_id = tagger_id === "" ? null : Number(tagger_id);
  return async (dispatch) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({ task_id, tagged_id, tagger_id: current_user_id }),
    };
    const response = await fetch(
      config.baseURL + config.endpoints.tags.add,
      requestOptions
    );
    const data = await response.json();
    // data : {user_id,display_name,role,.....//msg, status}
    // console.log("tag", data, task_id, tagger_id);
    let tag = data.data;
    if (tag) {
      dispatch({
        type: ADD_TAG,
        payload: { tag, msg: data.msg },
      });
      clearForm();
    } else {
      dispatch({
        type: ERROR_TAG,
        payload: { msg: data.msg },
      });
    }
  };
}

export function getTaggedUsersInTask(task_id) {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      config.baseURL + config.endpoints.tags.taggedUser + `/${task_id}`,
      requestOptions
    );
    const data = await response.json();
    console.log(
      "tag action",
      data,
      config.baseURL + config.endpoints.tags.taggedUser + `/${task_id}`
    );
    // data : [{user},{user}}]
    let taggedUsers = data.data;
    if (taggedUsers) {
      dispatch({
        type: GET_USERS_TAGGED_ON_PROJECT,
        payload: { taggedUsers },
      });
    } else {
      console.log("tagged users not fetched");
    }
  };
}

export function clearTagError() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ERROR_MSG,
    });
  };
}
