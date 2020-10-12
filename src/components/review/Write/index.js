import React from "react";
import useWindowDimensions from "../../../lib/windowDimensions";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import CreateIcon from "@material-ui/icons/Create";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "white",
    border: "thin solid #dcdcdc",
    borderRadius: "2px",
    width: "100%",
  },
  textArea: {
    width: "100%",
    border: "none",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(0),
    justifyContent: "space-between",
  },
  leftIcons: {
    display: "flex",
    flexDirection: "row",
  },
}));

const Write = () => {
  const classes = useStyles();
  const { width } = useWindowDimensions();

  return (
    <div style={{ width: width }}>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.background}>
          <TextareaAutosize
            aria-label="write review"
            rowsMin={4}
            className={classes.textArea}
          />
          <Divider variant="middle" />
          <List className={classes.box}>
            <div className={classes.leftIcons}>
              <ListItem>
                <IconButton size="small">
                  <CameraAltIcon color="action" />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton size="small">
                  <PhotoAlbumIcon color="action" />
                </IconButton>
              </ListItem>
            </div>
            <div>
              <ListItem>
                <IconButton size="small">
                  <CreateIcon color="action" />
                </IconButton>
              </ListItem>
            </div>
          </List>
        </div>
      </Container>
    </div>
  );
};

export default Write;