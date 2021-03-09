import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import expireReducer from "redux-persist-expire";
import storageSession from "redux-persist/lib/storage/session";
import storageLocal from "redux-persist/lib/storage";
import { all } from "redux-saga/effects";

import reviews from "./reviews";
import notices, { noticesSaga } from "./notices";
import loading from "./loading";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import review, { reviewSaga } from "./review";
import food, { foodSaga } from "./food";
import order from "./order";
import push from "./push";

export function* rootSaga() {
  yield all([noticesSaga(), authSaga(), userSaga(), reviewSaga(), foodSaga()]);
}

const pushConfig = {
  key: "gatmauel_local",
  storage: storageLocal,
};
const rootConfig = {
  key: "gatmauel_session", //세션 스토리지에 저장될 객체의 이름
  storage: storageSession,
  whitelist: ["order"], //root reducer에 있는 리듀서 중 order리듀서만 session storage의 gatmauel_session객체에 저장
  transforms: [
    //세션 스토리지에 있는 gatmauel_session객체에서 order값을 expire
    expireReducer("order", {
      expireSeconds: 1800,
      expiredState: {
        order: [],
        temp: {
          address: null,
          phone: null,
        },
      },
      autoExpire: true,
    }),
    expireReducer("push", {
      expireSeconds: 60 * 60 * 24 * 3,
      expiredState: {
        push: [],
      },
      autoExpire: true,
    }),
  ],
};
const rootReducer = combineReducers({
  reviews,
  notices,
  loading,
  auth,
  user,
  review,
  food,
  order,
  push: persistReducer(pushConfig, push),
});
export default persistReducer(rootConfig, rootReducer);
