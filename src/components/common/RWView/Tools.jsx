import React from 'react';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CreateIcon from "@material-ui/icons/Create";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
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

const Tools=()=>{
    const classes=useStyles();

    return(
        <>
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
        </>
    );
};

export default Tools;