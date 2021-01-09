import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Container from "@material-ui/core/Container";
import { MDBView } from "mdbreact";

import Circular from "../../common/Circular";

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

const CarouselMenu = ({ handleOpen, food }) => {
  const classes = useStyles();
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  const conRef = useRef(null);
  const [ratio, setRatio] = useState(1.25);

  // eslint-disable-next-line
  useEffect(() => {
    const width = conRef.current.getBoundingClientRect().width;
    const height = conRef.current.getBoundingClientRect().height;
    setRatio(width / height);
  });

  return (
    <div className={classes.root}>
      <Container className={classes.background} ref={conRef}>
        {food ? (
          <GridList
            className={classes.gridList}
            cols={parseFloat(clsx(medium ? ratio : small ? 2.25 : 1.25))}
            cellHeight="auto"
            spacing={8}
          >
            {food.map((data, index) => (
              <GridListTile
                key={data.name}
                style={{ margin: theme.spacing(1, 0) }}
              >
                <MDBView hover zoom>
                  <img
                    src={process.env.REACT_APP_CF_DOMAIN_NAME + data.img}
                    alt={data.name}
                    onClick={() => handleOpen(index)}
                    className="img-fluid"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                  <GridListTileBar
                    title={data.name}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}
                  />
                </MDBView>
              </GridListTile>
            ))}
          </GridList>
        ) : (
          <Circular
            container={{
              width: "100%",
              paddingTop: `${
                100 / parseFloat(clsx(medium ? ratio : small ? 2.25 : 1.25))
              }%`,
              position: "relative",
            }}
            inside={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: "auto",
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default React.memo(CarouselMenu);
