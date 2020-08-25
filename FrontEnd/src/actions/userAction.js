import config from "../config";

export const GET_USER_INFO = "GET_USER_INFO";

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
