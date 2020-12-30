import * as reviewsAPI from "../lib/api/reviews";
import { startLoading, finishLoading } from "./loading";

import { createAction } from "redux-actions";

const GET_REVIEWS_SUCCESS = "reviews/GET_REVIEWS_SUCCESS";
const GET_REVIEWS_FAILURE = "reviews/GET_REVIEWS_FAILURE";
const SUB_REVIEW = "review/SUB_REVIEW";
const MOD_REVIEW = "review/MOD_REVIEW";

const getReviewsSuccess = (payload) => ({ type: GET_REVIEWS_SUCCESS, payload });
const getReviewsFailure = (payload) => ({
  type: GET_REVIEWS_FAILURE,
  payload,
});

export const getReviews = (page) => async (dispatch) => {
  await dispatch(startLoading("reviews/GET"));

  try {
    const response = await reviewsAPI.reviews(page);
    await dispatch(getReviewsSuccess(response));
  } catch (e) {
    await dispatch(getReviewsFailure(e));
  }
  await dispatch(finishLoading("reviews/GET"));

  return { type: "reviews/GET", page };
};
export const subReview = createAction(SUB_REVIEW, ({ deleted: id }) => id);
export const modReview = createAction(
  MOD_REVIEW,
  ({ updated: id, content }) => ({
    id,
    content,
  })
);

const initialState = {
  reviews: null,
  error: null,
  lastPage: null,
};

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: [
          ...(state.reviews ? state.reviews : []).filter((item) => {
            return (
              action.payload.data.findIndex(({ id }) => item.id === id) === -1
            );
          }),
          ...action.payload.data,
        ].sort((l, r) => r.id - l.id),
        lastPage: parseInt(action.payload.headers["last-page"]),
      };
    case GET_REVIEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SUB_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((item) => {
          return item.id !== parseInt(action.payload);
        }),
      };
    case MOD_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((item) => {
          return item.id === parseInt(action.payload.id)
            ? {
                ...item,
                content: action.payload.content,
              }
            : item;
        }),
      };
    default:
      return state;
  }
};

export default reviews;
