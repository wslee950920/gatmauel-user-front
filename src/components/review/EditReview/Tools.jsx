import React from 'react';

import CreateIcon from "@material-ui/icons/Create";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CircularProgress from '@material-ui/core/CircularProgress';

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

const Tools=({
    handleClickOpen, 
    handleFileOnChange, 
    onSubmit, 
    onCamera, 
    inputId, 
    loading,
    progress,
    review,
    rOnly
  })=>{
    console.log(rOnly);
    const classes=useStyles();

    return(
        <>
          <Divider variant="middle" />
          <div className={classes.box}>
            <div className={classes.leftIcons}>    
              <IconButton 
                size="small" 
                onClick={onCamera} 
                disabled={!!review||loading}
              >
                <CameraAltIcon color="action" />
              </IconButton>
              {!rOnly&&(
                <input 
                  accept="image/*" 
                  className={classes.input} 
                  id={inputId} 
                  type="file" 
                  multiple
                  onChange={handleFileOnChange}
                  disabled={!!review||loading}
                />
              )}
              <label htmlFor={inputId} className={classes.label}>                 
                <IconButton 
                  size="small" 
                  aria-label="upload picture" 
                  component="span"
                  onClick={handleClickOpen}
                  disabled={!!review||loading}
                >
                  <PhotoAlbumIcon color="action" />
                </IconButton>
              </label>
            </div>
            <div>
              <IconButton size="small" onClick={onSubmit}>
                {
                  loading?
                  <CircularProgress 
                    color='primary' 
                    size='1.5rem' 
                    variant="determinate" 
                    value={progress}
                  />:
                  <CreateIcon color="action" />
                }
              </IconButton>        
            </div>
          </div>
        </>
    );
};

export default React.memo(Tools);