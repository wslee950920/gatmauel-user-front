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
const INIT = "auth/INIT";

export const fetchRegister = createAction(
  REGISTER,
  ({ nick, email, password }) => ({
    nick,
    email,
    password,
  })
);
export const fetchLogin = createAction(
  LOGIN,
  ({ email, password, checked }) => ({
    email,
    password,
    checked,
  })
);
export const checkNick = createAction(CHECK_NICK, ({ nick }) => ({
  nick,
}));
export const initAuth = createAction(INIT);

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const checkNickSaga = createRequestSaga(CHECK_NICK, authAPI.checkNick);
export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(CHECK_NICK, checkNickSaga);
}

const initialState = {
  login: null,
  loginError: null,
  register: null,
  registerError: null,
  nick: null,
  nickError: null,
};

const auth = handleActions(
  {
    [LOGIN]: (state) => ({
      ...state,
      login: null,
      loginError: null,
    }),
    [LOGIN_SUCCESS]: (state, { payload: login }) => ({
      ...state,
      login,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loginError: error,
    }),
    [REGISTER]: (state) => ({
      ...state,
      register: null,
      registerError: null,
    }),
    [REGISTER_SUCCESS]: (state, { payload: register }) => ({
      ...state,
      register,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      registerError: error,
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
    [INIT]: () => ({
      ...initialState,
    }),
  },
  initialState
);

export default auth;
