import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import reviews from "./reviews";
import notices, { noticesSaga } from "./notices";
import loading from "./loading";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import write, { writeSaga } from "./write";

export function* rootSaga() {
  yield all([noticesSaga(), authSaga(), userSaga(), writeSaga()]);
}

const rootReducer = combineReducers({
  reviews,
  notices,
  loading,
  auth,
  user,
  write,
});
export default rootReducer;
