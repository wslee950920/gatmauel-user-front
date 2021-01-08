import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";

import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as foodAPI from "../lib/api/food";

const [
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
] = createRequestActionTypes("get/CATEGORY");
const [GET_FOOD, GET_FOOD_SUCCESS, GET_FOOD_FAILURE] = createRequestActionTypes(
  "get/FOOD"
);

export const getCategory = createAction(GET_CATEGORY);
export const getFood = createAction(GET_FOOD);

const getCategorySaga = createRequestSaga(GET_CATEGORY, foodAPI.category);
const getFoodSaga = createRequestSaga(GET_FOOD, foodAPI.food);

export function* foodSaga() {
  yield takeLatest(GET_CATEGORY, getCategorySaga);
  yield takeLatest(GET_FOOD, getFoodSaga);
}

const initialState = {
  category: null,
  food: null,
  error: null,
};

const food = handleActions(
  {
    [GET_CATEGORY_SUCCESS]: (state, { payload }) => ({
      ...state,
      category: payload.data,
    }),
    [GET_CATEGORY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_FOOD_SUCCESS]: (state, { payload }) => ({
      ...state,
      food: payload.data,
    }),
    [GET_FOOD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default food;
