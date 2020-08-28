import { combineReducers } from "redux";
import login from "./loginReducer";
import users from "./userReducer";
import register from "./registerReducer";
import project from "./projectReducer";
import task from "./taskReducer";
import comment from "./commentReducer";
import tag from "./tagReducer";

const reducer = combineReducers({
  login,
  users,
  register,
  project,
  task,
  comment,
  tag,
});

export default reducer;
