import config from "../config";

export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const ERROR_CREATE_NEW_USER = "ERROR_CREATE_NEW_USER";

export function createNewUser(display_name, email, password, role, clearFrom) {
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
        payload: { user, msg: "New User Created" },
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
