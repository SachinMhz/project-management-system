import { combineReducers } from "redux";
import login from "./loginReducer";
import users from "./userReducer";

const reducer = combineReducers({
  login,
  users,
});

export default reducer;
