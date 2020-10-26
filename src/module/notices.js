import * as noticesAPI from "../lib/api/notices";
import { call, put, takeEvery } from "redux-saga/effects";

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
  error: true,
  payload: error,
});

const getNotices = () => noticesAPI.notices();

function* getNoticesSaga(action) {
  try {
    yield put(getNoticesPending());

    const response = yield call(getNotices);
    yield put(getNoticesSuccess(response.data));
  } catch (e) {
    yield put(getNoticesFailure(e));
  }
}
