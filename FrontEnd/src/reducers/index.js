import { combineReducers } from "redux";
import login from "./loginReducer";
import users from "./userReducer";
import register from "./registerReducer";
import project from "./projectReducer";
import task from "./taskReducer";

const reducer = combineReducers({
  login,
  users,
  register,
  project,
  task,
});

export default reducer;
