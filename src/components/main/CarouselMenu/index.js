import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Container from "@material-ui/core/Container";

import { tileData } from "./TileData.json";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    padding: "0.4rem",
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
  tile: { height: "90%" },
  tileRoot: { display: "flex", alignItems: "center" },
}));

const CarouselMenu = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xl" className={classes.background}>
        <GridList className={classes.gridList} cols={1.5}>
          {tileData.map((tile) => (
            <GridListTile
              key={tile.img}
              classes={{ tile: classes.tile, root: classes.tileRoot }}
              style={{ height: "66.666vw" }}
            >
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    </div>
  );
};

export default CarouselMenu;
