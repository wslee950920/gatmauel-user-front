import React from "react";
import { NaverMap, Marker } from "react-naver-maps";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import ShareBtn from "./ShareBtn";
import Fab from "../common/Fab";

import usePlatform from "../../lib/usePlatform";

const useStyles = makeStyles((theme) => ({
  map: {
    width: "100%", // 네이버지도 가로 길이
    height: "60vh", // 네이버지도 세로 길이
  },
}));

const Map = ({ order }) => {
  const navermaps = window.naver.maps;
  const classes = useStyles();
  const platform = usePlatform();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" disableGutters>
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
        <ShareBtn platform={platform} />
      </Container>
      <Fab order={order} />
    </>
  );
};

export default React.memo(Map);
