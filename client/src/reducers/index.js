import { combineReducers } from "redux";
import { recipesReducer } from "./recipesReducer";
import { userReducer } from "./userReducer";

export default combineReducers({ recipesReducer, userReducer });
