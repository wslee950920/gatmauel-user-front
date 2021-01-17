import React from "react";

import HeaderCon from "../../containers/main/HeaderCon";
import OrderCon from "../../containers/order/OrderCon";
import Footer from "../../components/footer";

const OrderPage = () => {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <HeaderCon main />
      <OrderCon />
      <Footer />
    </div>
  );
};

export default OrderPage;
