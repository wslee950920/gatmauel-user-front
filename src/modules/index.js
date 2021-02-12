import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import expireReducer from "redux-persist-expire";
import createFilter from "redux-persist-transform-filter";
import storageSession from "redux-persist/lib/storage/session";
import { all } from "redux-saga/effects";

import reviews from "./reviews";
import notices, { noticesSaga } from "./notices";
import loading from "./loading";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import review, { reviewSaga } from "./review";
import food, { foodSaga } from "./food";
import order, { orderSaga } from "./order";

export function* rootSaga() {
  yield all([
    noticesSaga(),
    authSaga(),
    userSaga(),
    reviewSaga(),
    foodSaga(),
    orderSaga(),
  ]);
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
        result: null,
        error: null,
      },
      autoExpire: true,
    }),
    createFilter("order", ["order", "temp", "result"]),
  ],
};
export default persistReducer(persistConfig, rootReducer);
