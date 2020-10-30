import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import reviews from "./reviews";
import notices, { noticesSaga } from "./notices";
import loading from "./loading";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";

export function* rootSaga() {
  yield all([noticesSaga(), authSaga(), userSaga()]);
}

const rootReducer = combineReducers({ reviews, notices, loading, auth, user });
export default rootReducer;
