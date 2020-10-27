import { combineReducers } from "redux";
import reviews from "./reviews";
import notices from "./notices";

const rootReducer = combineReducers({ reviews, notices });
export default rootReducer;
