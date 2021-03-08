import * as noticesAPI from "../lib/api/notices";
import { call, put, takeLatest } from "redux-saga/effects";
import { startLoading, finishLoading } from "./loading";

const GET_NOTICES = "notices/GET_NOTICES";
const GET_NOTICES_SUCCESS = "notices/GET_NOTICES_SUCCESS";
const GET_NOTICES_FAILURE = "notices/GET_NOTICES_FAILURE";

const GET_RESULTS_SUCCESS = "notices/GET_RESULTS_SUCCESS";
const GET_RESULTS_FAILURE = "notices/GET_RESULTS_FAILURE";
const GET_RESULTS = "notices/GET_RESULT";

const CHANGE_SEARCH = "notices/CHANGE_QUERY";
const INIT_RESULTS = "notices/INIT_RESULT";

export const setSearch = (query) => ({ type: CHANGE_SEARCH, payload: query });
export const initResults = () => ({ type: INIT_RESULTS });
export const getResults = (query, page) => ({
  type: GET_RESULTS,
  payload: { query, page },
});
const getResultsSuccess = (data) => ({
  type: GET_RESULTS_SUCCESS,
  payload: data,
});
const getResultsFailure = (error) => ({
  type: GET_RESULTS_FAILURE,
  payload: error,
});

function* getResultsSaga(action) {
  yield put(startLoading("notices/GET"));

  try {
    const response = yield call(noticesAPI.search, action.payload);
    yield put(getResultsSuccess(response));
  } catch (e) {
    yield put(getResultsFailure(e));
  }
  yield put(finishLoading("notices/GET"));
}

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
  yield takeLatest(GET_RESULTS, getResultsSaga);
}

const initialState = {
  notices: [],
  error: null,
  lastPage: null,
  search: "",
  result: { docs: [], is_end: false },
};

const notices = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESULTS_SUCCESS:
      return {
        ...state,
        result: {
          docs: [...state.result.docs, ...action.payload.data.docs]
            .reduce((acc, cur) => {
              if (acc.findIndex(({ id }) => id === cur.id) === -1) {
                acc.push(cur);
              }
              return acc;
            }, [])
            .sort((l, r) => r.id - l.id),
          is_end: action.payload.data.is_end,
        },
      };
    case GET_RESULTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case INIT_RESULTS:
      return {
        ...state,
        result: {
          docs: [],
          is_end: false,
        },
      };
    case CHANGE_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case GET_NOTICES_SUCCESS:
      return {
        ...state,
        notices: [...state.notices, ...action.payload.data]
          .reduce((acc, cur) => {
            if (acc.findIndex(({ id }) => id === cur.id) === -1) {
              acc.push(cur);
            }
            return acc;
          }, [])
          .sort((l, r) => r.id - l.id),
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
