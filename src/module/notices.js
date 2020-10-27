import * as noticesAPI from "../lib/api/notices";

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

export const getNotices = () => async (dispatch) => {
  try {
    dispatch(getNoticesPending());

    const response = await noticesAPI.notices();
    dispatch(getNoticesSuccess(response.data));
  } catch (e) {
    dispatch(getNoticesFailure(e));

    throw e;
  }
};

const initialState = {
  notices: null,
  loading: false,
  error: null,
};

const notices = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTICES_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_NOTICES_SUCCESS:
      return {
        ...state,
        loading: false,
        notices: action.payload,
      };
    case GET_NOTICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default notices;
