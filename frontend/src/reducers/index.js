import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import users from "./users";
import questions from "./questions";
import exams from "./exam";

export default combineReducers({
  auth,
  message,
  users,
  questions,
  exams,
});
