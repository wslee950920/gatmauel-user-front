import * as noticesAPI from "../lib/api/notices";
import { call, put, takeLatest } from "redux-saga/effects";
import { startLoading, finishLoading } from "./loading";

const GET_NOTICES = "notices/GET_NOTICES";
const GET_NOTICES_SUCCESS = "notices/GET_NOTICES_SUCCESS";
const GET_NOTICES_FAILURE = "notices/GET_NOTICES_FAILURE";

export const getNotices = (page) => ({ type: GET_NOTICES, payload: page });
const getNoticesSuccess = (data) => ({
  type: GET_NOTICES_SUCCESS,
  payload: data,
});
const getNoticesFailure = (error) => ({
  type: GET_NOTICES_FAILURE,
  payload: error,
});

function* getNoticesSaga(action) {
  yield put(startLoading("notices/GET"));

  try {
    const response = yield call(noticesAPI.notices, action.payload);
    yield put(getNoticesSuccess(response));
  } catch (e) {
    yield put(getNoticesFailure(e));
  }
  yield put(finishLoading("notices/GET"));
}

export function* noticesSaga() {
  yield takeLatest(GET_NOTICES, getNoticesSaga);
}

const initialState = {
  notices: [],
  error: null,
  lastPage: null,
};

const notices = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTICES_SUCCESS:
      return {
        ...state,
        notices: [...state.notices, ...action.payload.data],
        lastPage: parseInt(action.payload.headers["last-page"]),
      };
    case GET_NOTICES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default notices;
