import { combineReducers } from "redux";
import reviews from "./reviews";
import notices, { noticesSaga } from "./notices";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([noticesSaga()]);
}

const rootReducer = combineReducers({ reviews, notices });
export default rootReducer;
