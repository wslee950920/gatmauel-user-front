import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import expireReducer from "redux-persist-expire";
import storageSession from "redux-persist/lib/storage/session";
import { all } from "redux-saga/effects";

import reviews from "./reviews";
import notices, { noticesSaga } from "./notices";
import loading from "./loading";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import review, { reviewSaga } from "./review";
import food, { foodSaga } from "./food";
import order from "./order";

export function* rootSaga() {
  yield all([noticesSaga(), authSaga(), userSaga(), reviewSaga(), foodSaga()]);
}

const rootReducer = combineReducers({
  reviews,
  notices,
  loading,
  auth,
  user,
  review,
  food,
  order,
});

const persistConfig = {
  key: "order",
  storage: storageSession,
  whitelist: ["order"],
  transforms: [
    expireReducer("order", {
      expireSeconds: 1800,
      expiredState: {
        order: [],
        temp: {},
      },
      autoExpire: true,
    }),
  ],
};
export default persistReducer(persistConfig, rootReducer);
