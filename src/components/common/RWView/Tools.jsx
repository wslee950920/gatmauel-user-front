import React from 'react';

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
      padding: theme.spacing(1),
      justifyContent: "space-between",
    },
    leftIcons: {
      display: "flex",
      flexDirection: "row",
    },
    input: {
      display: 'none',
    },
    label:{
      margin:theme.spacing(0, 1),
    }
  }));

const Tools=({handleClickOpen, handleFileOnChange, onSubmit})=>{
    const classes=useStyles();

    return(
        <>
          <Divider variant="middle" />
          <div className={classes.box}>
            <div className={classes.leftIcons}>    
              <IconButton size="small">
                <CameraAltIcon color="action" />
              </IconButton>
              <input 
                accept="image/*" 
                className={classes.input} 
                id="icon-button-file" 
                type="file" 
                multiple
                onChange={handleFileOnChange}
              />
              <label htmlFor="icon-button-file" className={classes.label}>                 
                <IconButton 
                  size="small" 
                  aria-label="upload picture" 
                  component="span"
                  onClick={handleClickOpen}
                >
                  <PhotoAlbumIcon color="action" />
                </IconButton>
              </label>
            </div>
            <div>
              <IconButton size="small" onClick={onSubmit}>
                <CreateIcon color="action" />
              </IconButton>        
            </div>
          </div>
        </>
    );
};

export default React.memo(Tools);