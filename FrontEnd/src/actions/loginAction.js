import config from "../config";

export const LOGIN = "LOGIN";
export const LOG_OUT = "LOG_OUT";

export function loginToServer(email, password) {
  return async (dispatch) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch(
      config.baseURL + config.endpoints.auth.login,
      requestOptions
    );
    const data = await response.json();
    if (data.token) {
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user_id", data.user_id);
      window.localStorage.setItem("display_name", data.display_name);
      window.localStorage.setItem("role", data.role);
      window.localStorage.setItem("email", data.email);
      // console.log(data);
      console.log("token and user_id set to local storage");
    }
    dispatch({
      type: LOGIN,
      payload: { status: "complete", msg: data.msg },
    });
  };
}

export function logOutUser() {
  return async (dispatch) => {
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("user_id", "");
    dispatch({
      type: LOG_OUT,
    });
  };
}
