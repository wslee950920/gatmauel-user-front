import React from "react";
import { NaverMap, Marker } from "react-naver-maps";
import useWindowDimensions from "../../lib/windowDimensions";
import clsx from "clsx";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import KakaoBtn from "./KakaoBtn";
import Footer from "../../components/footer";

import usePlatform from "../../lib/usePlatform";

const useStyles = makeStyles((theme) => ({
  map: {
    width: "100%", // 네이버지도 가로 길이
    height: "60vh", // 네이버지도 세로 길이
  },
}));

const Map = () => {
  const navermaps = window.naver.maps;
  const classes = useStyles();
  const { height } = useWindowDimensions();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const platform = usePlatform();

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="md"
        disableGutters
        style={{
          height: height - 56 - 57.43 - parseInt(clsx(matches ? 8 : "0")),
        }}
      >
        <NaverMap
          mapDivId={"gatmauel-map"}
          className={classes.map}
          defaultCenter={{ lat: 37.29274, lng: 126.941063 }} // 지도 초기 위치
          defaultZoom={16} // 지도 초기 확대 배율
          style={{ height: "60vh" }}
        >
          <Marker
            key={1}
            position={new navermaps.LatLng(37.29274, 126.941063)}
            animation={2}
          />
        </NaverMap>
        <KakaoBtn platform={platform} />
      </Container>
      <Footer />
    </>
  );
};

export default Map;
