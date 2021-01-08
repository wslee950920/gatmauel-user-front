import React, { useEffect } from "react";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";

import Map from "../../components/map";
import Circular from "../../components/common/Circular";
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
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_NAVER_MAP_CLIENT}
        error={<p>Maps Load Error</p>}
        loading={
          <Circular
            container={{
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        }
      >
        <Map />
      </RenderAfterNavermapsLoaded>
      <Footer />
    </div>
  );
};

export default MapPage;
