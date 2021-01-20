import React, { useEffect } from "react";

import MapCon from "../../containers/map/MapCon";
import HeaderCon from "../../containers/main/HeaderCon";
import Footer from "../../components/footer";

const MapPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <HeaderCon main />
      <MapCon />
      <Footer map />
    </div>
  );
};

export default MapPage;
