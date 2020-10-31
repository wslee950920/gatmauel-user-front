import * as noticesAPI from "../lib/api/notices";
import { call, put, takeEvery } from "redux-saga/effects";
import { startLoading, finishLoading } from "./loading";

const GET_NOTICES_PENDING = "notices/GET_NOTICES_PENDING";
const GET_NOTICES_SUCCESS = "notices/GET_NOTICES_SUCCESS";
const GET_NOTICES_FAILURE = "notices/GET_NOTICES_FAILURE";

const getNoticesPending = () => ({ type: GET_NOTICES_PENDING });
const getNoticesSuccess = (data) => ({
  type: GET_NOTICES_SUCCESS,
  payload: data,
});
const getNoticesFailure = (error) => ({
  type: GET_NOTICES_FAILURE,
  payload: error,
});

export const getNotices = () => async (dispatch) =>
  await dispatch(getNoticesPending());

function* getNoticesSaga(action) {
  yield put(startLoading("notices/GET"));

  try {
    const response = yield call(noticesAPI.notices);
    yield put(getNoticesSuccess(response.data));
  } catch (e) {
    yield put(getNoticesFailure(e));
  }

  yield put(finishLoading("notices/GET"));
}

export function* noticesSaga() {
  yield takeEvery(GET_NOTICES_PENDING, getNoticesSaga);
}

const initialState = {
  notices: null,
  error: null,
};

const notices = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTICES_PENDING:
      return {
        ...state,
        error: null,
        notices: null,
      };
    case GET_NOTICES_SUCCESS:
      return {
        ...state,
        notices: action.payload,
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
