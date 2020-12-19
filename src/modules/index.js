import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import reviews from "./reviews";
import notices, { noticesSaga } from "./notices";
import loading from "./loading";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import review, { reviewSaga } from "./review";

export function* rootSaga() {
  yield all([noticesSaga(), authSaga(), userSaga(), reviewSaga()]);
}

const rootReducer = combineReducers({
  reviews,
  notices,
  loading,
  auth,
  user,
  review,
});
export default rootReducer;
