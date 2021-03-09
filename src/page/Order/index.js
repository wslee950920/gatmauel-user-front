import React from "react";

import HeaderCon from "../../containers/main/HeaderCon";
import OrderCon from "../../containers/order/OrderCon";
import Footer from "../../components/footer";

const OrderPage = () => {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <HeaderCon />
      <OrderCon />
      <Footer map />
    </div>
  );
};

export default OrderPage;
