import { user } from "./client";

export const makeOrder = ({
  phone,
  total,
  request,
  order,
  deli,
  addr: address,
  detail,
}) =>
  user.post("/api/order/pay", {
    phone,
    total,
    request,
    order,
    deli,
    address,
    detail,
  });
