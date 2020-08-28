import config from "../config";

export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const ERROR_CREATE_NEW_USER = "ERROR_CREATE_NEW_USER";
export const CLEAR_ERROR_MSG = "CLEAR_ERROR_MSG";
export const LOG_OUT = "LOG_OUT";

export function createNewUser(display_name, email, password, _role, clearFrom) {
  let role = _role === "" ? null : _role;
  return async (dispatch) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, display_name, role }),
    };
    const response = await fetch(
      config.baseURL + config.endpoints.auth.register,
      requestOptions
    );
    let data = await response.json();
    console.log(data);
    //success data : {data:{user:},msg:}
    //fail data : {msg:,status:}
    let user = data.data;
    if (user) {
      dispatch({
        type: CREATE_NEW_USER,
        payload: { user, msg: "New User Created", success: "New User Created" },
      });
      clearFrom();
    } else {
      dispatch({
        type: ERROR_CREATE_NEW_USER,
        payload: { msg: data.msg },
      });
    }
  };
}

export function clearErrorMsg() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ERROR_MSG,
    });
  };
}
