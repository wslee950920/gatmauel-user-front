import { createAction, handleActions } from "redux-actions";

const ADD_ORDER = "order/ADD";
const SUB_ORDER = "order/SUB";

export const addOrder = createAction(ADD_ORDER);
export const subOder = createAction(SUB_ORDER);

const initialState = {
  order: [],
};

const order = handleActions(
  {
    [ADD_ORDER]: (state, { payload }) => ({
      ...state,
      order: state.order.concat(payload),
    }),
    [SUB_ORDER]: (state, { payload }) => ({
      ...state,
      order: state.order.filter((o) => o.id !== payload.id),
    }),
  },
  initialState
);

export default order;
