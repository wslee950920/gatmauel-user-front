import React from "react";

import MapCon from "../../containers/map/MapCon";
import HeaderCon from "../../containers/main/HeaderCon";
import Footer from "../../components/footer";

const MapPage = () => {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <HeaderCon />
      <MapCon />
      <Footer fixed />
    </div>
  );
};

export default MapPage;
