import * as reviewsAPI from "../lib/api/reviews";

const GET_REVIEWS_PENDING = "reviews/GET_REVIEWS_PENDING";
const GET_REVIEWS_SUCCESS = "reviews/GET_REVIEWS_SUCCESS";
const GET_REVIEWS_FAILURE = "reviews/GET_REVIEWS_FAILURE";

const getReviewsPending = () => ({ type: GET_REVIEWS_PENDING });
const getReviewsSuccess = (payload) => ({ type: GET_REVIEWS_SUCCESS, payload });
const getReviewsFailure = (payload) => ({
  type: GET_REVIEWS_FAILURE,
  error: true,
  payload,
});

export const getReviews = () => async (dispatch) => {
  try {
    dispatch(getReviewsPending());

    const response = await reviewsAPI.reviews();
    dispatch(getReviewsSuccess(response));
  } catch (e) {
    dispatch(getReviewsFailure(e));

    throw e;
  }
};

const initialState = {
  reviews: null,
  loading: false,
  error: null,
};

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_PENDING:
      return { ...state, loading: true };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload.data,
      };
    case GET_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reviews;
