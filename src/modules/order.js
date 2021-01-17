import { createAction, handleActions } from "redux-actions";

const INSERT_TO_CART = "order/CART";
const SUB_ORDER = "order/SUB";
const ADD_ORDER = "order/ADD";
const REMOVE_ORDER = "order/REMOVE";
const CHANGE_ORDER = "order/CHANGE";

export const insertToCart = createAction(INSERT_TO_CART);
export const subOrder = createAction(SUB_ORDER);
export const addOrder = createAction(ADD_ORDER);
export const removeOrder = createAction(REMOVE_ORDER);
export const changeOrder = createAction(CHANGE_ORDER);

const initialState = {
  order: [],
};

const order = handleActions(
  {
    [INSERT_TO_CART]: (state, { payload }) => ({
      ...state,
      order: state.order.concat(payload),
    }),
    [SUB_ORDER]: (state, { payload }) => ({
      ...state,
      order: state.order.map((v, i) =>
        payload === i ? { ...v, num: v.num === "" ? 1 : v.num - 1 } : v
      ),
    }),
    [ADD_ORDER]: (state, { payload }) => ({
      ...state,
      order: state.order.map((v, i) =>
        payload === i ? { ...v, num: v.num === "" ? 1 : v.num + 1 } : v
      ),
    }),
    [REMOVE_ORDER]: (state, { payload }) => ({
      ...state,
      order: state.order.filter((v, i) => i !== payload),
    }),
    [CHANGE_ORDER]: (state, { payload }) => ({
      ...state,
      order: state.order.map((v, i) =>
        payload.index === i ? { ...v, num: payload.num } : v
      ),
    }),
  },
  initialState
);

export default order;
