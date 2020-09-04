import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Container from "@material-ui/core/Container";

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
    color: theme.palette.primary.light,
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

const tileData = [
  {
    img: "images/test/IMG_1097.jpg",
    title: "Image",
    author: "author",
  },
  {
    img: "images/test/IMG_1752.jpg",
    title: "Image",
    author: "author",
  },
  {
    img: "images/test/IMG_1822.jpg",
    title: "Image",
    author: "author",
  },
  {
    img: "images/test/IMG_2083.jpg",
    title: "Image",
    author: "author",
  },
  {
    img: "images/test/IMG_2090.jpg",
    title: "Image",
    author: "author",
  },
  {
    img: "images/test/IMG_2112.jpg",
    title: "Image",
    author: "author",
  },
  {
    img: "images/test/IMG_2143.jpg",
    title: "Image",
    author: "author",
  },
  {
    img: "images/test/IMG_2144.jpg",
    title: "Image",
    author: "author",
  },
  {
    img: "images/test/IMG_2158.jpg",
    title: "Image",
    author: "author",
  },
  {
    img: "images/test/IMG_2159.jpg",
    title: "Image",
    author: "author",
  },
];

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
              style={{ height: "66.6667vw" }}
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
