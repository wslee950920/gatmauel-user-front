import React, { useEffect } from "react";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";

import Map from "../../components/map";
import Circular from "../../components/common/Cirular";
import Header from "../../components/header";

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
    <>
      <Header />
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_NAVER_MAP_CLIENT}
        error={<p>Maps Load Error</p>}
        loading={<Circular height="60vh" />}
      >
        <Map />
      </RenderAfterNavermapsLoaded>
    </>
  );
};

export default MapPage;
