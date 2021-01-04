import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as userAPI from "../lib/api/user";
import { initAuth } from "../modules/auth";

const TEMP_SET_USER = "user/TEMP_SET_USER";
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  "user/CHECK"
);
const LOGOUT = "user/LOGOUT";
const [GET_INFO, GET_INFO_SUCCESS, GET_INFO_FAILURE] = createRequestActionTypes(
  "user/GET_INFO"
);
const [
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
] = createRequestActionTypes("user/UPDATE");
const [
  UPDATE_PW,
  UPDATE_PW_SUCCESS,
  UPDATE_PW_FAILURE,
] = createRequestActionTypes("pw/UPDATE");
const [
  WITHDRAW_USER,
  WITHDRAW_USER_SUCCESS,
  WITHDRAW_USER_FAILURE,
] = createRequestActionTypes("user/WITHDRAW");

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const getInfo = createAction(GET_INFO);
export const userUpdate = createAction(UPDATE_USER, (content) => content);
export const pwUpdate = createAction(UPDATE_PW, (content) => content);
export const userWithdraw = createAction(WITHDRAW_USER, (content) => content);

const getInfoSaga = createRequestSaga(GET_INFO, userAPI.getInfo);
const checkSaga = createRequestSaga(CHECK, authAPI.check);
const userUpdateSaga = createRequestSaga(UPDATE_USER, userAPI.userUpdate);
const pwUpdateSaga = createRequestSaga(UPDATE_PW, userAPI.pwUpdate);
const userWithdrawSaga = createRequestSaga(WITHDRAW_USER, userAPI.userWithdraw);

function checkFailureSaga() {
  try {
    localStorage.removeItem("user");
    put(initAuth());
  } catch (e) {
    console.error("localStorage is not working");
  }
}
function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    yield localStorage.removeItem("user");
    yield put(initAuth());
  } catch (e) {
    console.error(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(GET_INFO, getInfoSaga);
  yield takeLatest(UPDATE_USER, userUpdateSaga);
  yield takeLatest(UPDATE_PW, pwUpdateSaga);
  yield takeLatest(WITHDRAW_USER, userWithdrawSaga);
}

const initialState = {
  user: null,
  info: null,
  error: null,
};

export default handleActions(
  {
    [GET_INFO_SUCCESS]: (state, { payload: info }) => ({
      ...state,
      info: info.data,
    }),
    [GET_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user: user.data,
      error: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      error: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
      info: null,
    }),
    [UPDATE_USER_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      user: result.data.user,
      info: result.data.info,
    }),
    [UPDATE_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UPDATE_PW_SUCCESS]: (state, { payload }) => ({
      ...state,
      user: null,
      info: null,
    }),
    [UPDATE_PW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [WITHDRAW_USER_SUCCESS]: (state, { payload }) => ({
      ...state,
      user: null,
      info: null,
    }),
    [WITHDRAW_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);
