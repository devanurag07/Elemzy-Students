import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import style from "./style";
import ClassroomReducer from "../students/reducers";


export default combineReducers({
  errors,
  messages,
  auth,
  style,
  classroom:ClassroomReducer,
});
