import { createAction, handleActions } from "redux-actions";

const GET_PUSH = "push/GET";
const READ_PUSH = "push/READ";

export const getPush = createAction(GET_PUSH, (push) => push);
export const readPush = createAction(READ_PUSH);

const initialState = {
  push: [],
};

const push = handleActions(
  {
    [GET_PUSH]: (state, { payload }) => ({
      ...state,
      push: state.push.concat(payload),
    }),
    [READ_PUSH]: (state) => ({
      ...state,
      push: [],
    }),
  },
  initialState
);

export default push;
