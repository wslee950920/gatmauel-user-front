import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  "auth/LOGIN"
);
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  "auth/REGISTER"
);
const [
  CHECK_NICK,
  CHECK_NICK_SUCCESS,
  CHECK_NICK_FAILURE,
] = createRequestActionTypes("auth/CHECK_NICK");

export const register = createAction(REGISTER, ({ nick, email, password }) => ({
  nick,
  email,
  password,
}));
export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}));
export const checkNick = createAction(CHECK_NICK, ({ nick }) => ({
  nick,
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const checkNickSaga = createRequestSaga(CHECK_NICK, authAPI.checkNick);
export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(CHECK_NICK, checkNickSaga);
}

const initialState = {
  auth: null,
  authError: null,
  nick: null,
  nickError: null,
};

const auth = handleActions(
  {
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [CHECK_NICK_SUCCESS]: (state, { payload: nick }) => ({
      ...state,
      nick,
      nickError: null,
    }),
    [CHECK_NICK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      nickError: error,
    }),
  },
  initialState
);

export default auth;
