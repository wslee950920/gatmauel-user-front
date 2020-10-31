import * as reviewsAPI from "../lib/api/reviews";
import { startLoading, finishLoading } from "./loading";

const GET_REVIEWS_PENDING = "reviews/GET_REVIEWS_PENDING";
const GET_REVIEWS_SUCCESS = "reviews/GET_REVIEWS_SUCCESS";
const GET_REVIEWS_FAILURE = "reviews/GET_REVIEWS_FAILURE";

const getRivewsPending = () => ({ type: GET_REVIEWS_PENDING });
const getReviewsSuccess = (payload) => ({ type: GET_REVIEWS_SUCCESS, payload });
const getReviewsFailure = (payload) => ({
  type: GET_REVIEWS_FAILURE,
  payload,
});

export const getReviews = () => async (dispatch) => {
  await dispatch(getRivewsPending());
  await dispatch(startLoading("reviews/GET"));

  try {
    const response = await reviewsAPI.reviews();
    await dispatch(getReviewsSuccess(response));
  } catch (e) {
    await dispatch(getReviewsFailure(e));
  }

  await dispatch(finishLoading("reviews/GET"));
};

const initialState = {
  reviews: null,
  error: null,
};

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_PENDING:
      return {
        ...state,
        reviews: null,
        error: null,
      };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload.data,
      };
    case GET_REVIEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reviews;
