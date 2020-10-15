import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Container from "@material-ui/core/Container";
import { MDBView } from "mdbreact";

import tileData from "./TileData";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,

    padding: theme.spacing(0.8),
    height: "100%",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: "#FDFEFE",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },

  background: {
    backgroundColor: "white",
    border: "solid #dcdcdc",
    borderRadius: "8px",
    height: "100%",
    alignItems: "center",
    display: "flex",
  },
}));

const CarouselMenu = ({ handleOpen, onMouseOver }) => {
  const classes = useStyles();
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  const large = useMediaQuery(theme.breakpoints.up("lg"));
  const xlarge = useMediaQuery(theme.breakpoints.up("xl"));
  const conRef = useRef(null);
  const [ratio, setRatio] = useState(1.25);
  const [scrHeight, setScrHeight] = useState(16);

  useEffect(() => {
    setScrHeight(conRef.current.offsetHeight - conRef.current.clientHeight);
  }, []);
  useEffect(() => {
    const width =
      conRef.current.getBoundingClientRect().width -
      parseFloat(window.getComputedStyle(conRef.current, null).paddingLeft) -
      parseFloat(window.getComputedStyle(conRef.current, null).paddingRight);
    const height =
      conRef.current.getBoundingClientRect().height -
      2 * theme.spacing(1) -
      scrHeight -
      parseFloat(window.getComputedStyle(conRef.current, null).borderTopWidth) -
      parseFloat(
        window.getComputedStyle(conRef.current, null).borderBottomWidth
      ) -
      parseFloat(
        window.getComputedStyle(conRef.current, null).borderBottomWidth
      ); //스크롤바에 border가 겹쳐서 그런듯
    setRatio(width / height);
  }, [theme, scrHeight, medium, large, xlarge]);

  return (
    <div className={classes.root}>
      <Container className={classes.background} ref={conRef}>
        <GridList
          className={classes.gridList}
          cols={parseFloat(clsx(medium ? ratio : small ? 2.25 : 1.25))}
        >
          {tileData.map((tile) => (
            <GridListTile
              key={tile.img}
              style={{
                height: "auto",
                margin: theme.spacing(1, 0),
              }}
            >
              <MDBView hover zoom>
                <img
                  src={tile.img}
                  alt={tile.title}
                  onClick={handleOpen}
                  className="img-fluid"
                  style={{
                    cursor: "pointer",
                  }}
                  onMouseOver={onMouseOver}
                />
                <GridListTileBar
                  title={tile.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </MDBView>
            </GridListTile>
          ))}
        </GridList>
      </Container>
    </div>
  );
};

export default React.memo(CarouselMenu);
