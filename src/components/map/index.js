import React from "react";
import { NaverMap, Marker } from "react-naver-maps";
import loadable from "@loadable/component";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import usePlatform from "../../lib/usePlatform";

import ShareBtn from "./ShareBtn";
const Fab = loadable(() => import("../common/Fab"));

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
          defaultCenter={{ lat: 37.292731, lng: 126.941056 }} // 지도 초기 위치
          defaultZoom={16} // 지도 초기 확대 배율
          style={{ height: "60vh" }}
        >
          <Marker
            key={1}
            position={new navermaps.LatLng(37.292731, 126.941056)}
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
