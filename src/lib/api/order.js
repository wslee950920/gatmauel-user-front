import { user } from "./client";

export const makeOrder = ({
  phone,
  total,
  request,
  order,
  deli,
  addr: address,
  detail,
  measure,
}) =>
  user.post(`/api/order/pay?measure=${measure}`, {
    phone,
    total,
    request,
    order,
    deli,
    address,
    detail,
  });
