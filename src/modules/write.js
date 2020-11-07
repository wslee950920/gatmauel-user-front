import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as reviewAPI from "../lib/api/review";
import { takeLatest } from "redux-saga/effects";

const [
  WRITE_REVIEW,
  WRITE_REVIEW_SUCCESS,
  WRITE_REVIEW_FAILURE,
] = createRequestActionTypes("write/WRITE_REVIEW");

export const writeReview = createAction(WRITE_REVIEW, (formData) => formData);

const writeReviewSaga = createRequestSaga(WRITE_REVIEW, reviewAPI.writeReview);
export function* writeSaga() {
  yield takeLatest(WRITE_REVIEW, writeReviewSaga);
}

const initialState = {
  review: null,
  reviewError: null,
};

const write = handleActions(
  {
    [WRITE_REVIEW]: (state) => ({
      ...state,
      review: null,
      reviewError: null,
    }),
    [WRITE_REVIEW_SUCCESS]: (state, { payload: review }) => ({
      ...state,
      review,
    }),
    [WRITE_REVIEW_FAILURE]: (state, { payload: reviewError }) => ({
      ...state,
      reviewError,
    }),
  },
  initialState
);

export default write;
