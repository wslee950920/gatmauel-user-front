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
const [
  UPDATE_REVIEW,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAILURE,
] = createRequestActionTypes("update/UPDATE_REVIEW");
const [
  REMOVE_REVIEW,
  REMOVE_REVIEW_SUCCESS,
  REMOVE_REVIEW_FAILURE,
] = createRequestActionTypes("remove/REMOVE_REVIEW");

const INITIALIZE = "write/INITIALIZE";
const CHANGE_FIELD = "write/CHANGE_FIELD";
const OPEN_DIALOG = "write/OPEN_DIALOG";
const CLOSE_DIALOG = "write/CLOSE_DIALOG";
const ADD_IMAGE = "write/ADD_IMAGE";
const REMOVE_IMAGE = "write/REMOVE_IMAGE";

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const writeReview = createAction(
  WRITE_REVIEW,
  ({ formData, setProgress }) => ({
    formData,
    setProgress,
  })
);
export const updateReview = createAction(UPDATE_REVIEW, ({ id, content }) => ({
  id,
  content,
}));
export const removeReview = createAction(REMOVE_REVIEW, (id) => id);

export const openDialog = createAction(OPEN_DIALOG);
export const closeDialog = createAction(CLOSE_DIALOG);

export const addImage = createAction(ADD_IMAGE, ({ file, previewURL }) => ({
  file,
  previewURL,
}));
export const removeImage = createAction(REMOVE_IMAGE, (index) => index);

const writeReviewSaga = createRequestSaga(WRITE_REVIEW, reviewAPI.write);
const updateReviewSaga = createRequestSaga(UPDATE_REVIEW, reviewAPI.update);
const removeReviewSaga = createRequestSaga(REMOVE_REVIEW, reviewAPI.remove);

export function* reviewSaga() {
  yield takeLatest(WRITE_REVIEW, writeReviewSaga);
  yield takeLatest(UPDATE_REVIEW, updateReviewSaga);
  yield takeLatest(REMOVE_REVIEW, removeReviewSaga);
}

const initialState = {
  review: null,
  reviewError: null,
  content: "",
  imgs: [],
  open: false,
};

const review = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
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
    [UPDATE_REVIEW]: (state) => ({
      ...state,
      review: null,
      reviewError: null,
    }),
    [UPDATE_REVIEW_SUCCESS]: (state, { payload: review }) => ({
      ...state,
      review,
    }),
    [UPDATE_REVIEW_FAILURE]: (state, { payload: reviewError }) => ({
      ...state,
      reviewError,
    }),
    [REMOVE_REVIEW]: (state) => ({
      ...state,
      review: null,
      reviewError: null,
    }),
    [REMOVE_REVIEW_SUCCESS]: (state, { payload: review }) => ({
      ...state,
      review,
    }),
    [REMOVE_REVIEW_FAILURE]: (state, { payload: reviewError }) => ({
      ...state,
      reviewError,
    }),
    [OPEN_DIALOG]: (state) => ({
      ...state,
      open: true,
    }),
    [CLOSE_DIALOG]: (state) => ({
      ...state,
      open: false,
    }),
    [ADD_IMAGE]: (state, { payload: { file, previewURL } }) =>
      state.imgs.length < 5
        ? {
            ...state,
            imgs: [
              ...state.imgs,
              {
                file,
                previewURL,
              },
            ],
          }
        : state,
    [REMOVE_IMAGE]: (state, { payload: index }) => ({
      ...state,
      imgs: state.imgs.filter((v, i) => index !== i),
    }),
  },
  initialState
);

export default review;
