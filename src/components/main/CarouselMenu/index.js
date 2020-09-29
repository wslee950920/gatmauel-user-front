import React from "react";

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
  },
  tileRoot: { display: "flex", alignItems: "center" },
  imgFull: {
    width: "100%",
    height: "100%",
  },
}));

const CarouselMenu = ({ handleOpen, onMouseOver }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div className={classes.root}>
      <Container maxWidth="xl" className={classes.background}>
        <GridList className={classes.gridList} cols={1.465}>
          {tileData.map((tile) => (
            <GridListTile
              key={tile.img}
              classes={{
                root: classes.tileRoot,
                imgFullHeight: classes.imgFull,
                imgFullWidth: classes.imgFull,
              }}
              style={{
                height: matches ? "auto" : "68.2594vw",
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
                    height: matches ? "auto" : "68.2594vw",
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
