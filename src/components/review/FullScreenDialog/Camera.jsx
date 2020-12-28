import React from "react";
import {Link as RouterLink} from 'react-router-dom';

import CameraIcon from "@material-ui/icons/Camera";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';

import Circular from '../../common/Circular';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(8, 0),
    position: "relative",
    paddingBottom: "100%",
    height: 0,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  container: {
    height: "100%",
  },
  btn: {
    margin: theme.spacing(8, 0),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: theme.spacing(0.5),
  },
  back:{
    display:'flex',
    justifyContent:'flex-end'
  },
  link:{
    fontFamily:'Roboto',
    margin:theme.spacing(0, 2, 4, 0)
  }
}));

const Camera = ({handleClose, loading, video, getCapture }) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.header}>
          <Button onClick={handleClose} color="secondary">
            취소
          </Button>
        </div>
        <Divider />
      </Container>
      <Container maxWidth="sm" disableGutters className={classes.container}>
        <div className={classes.wrapper}>
          <video
              ref={video}
              className={classes.video}
              playsInline
              muted
              autoPlay
          />
        </div>
        <div className={classes.btn}>
          {loading?
            <Circular/>:(
              <IconButton onClick={getCapture}>
                <CameraIcon color="action" fontSize="large" />
              </IconButton>
            )
          }
        </div>
        <div className={classes.back}>
          <Link 
            component={RouterLink} 
            to='/review/write' 
            color='textSecondary' 
            className={classes.link}
          >
            돌아가기
          </Link>
        </div>
      </Container>
    </>
  );
};

export default React.memo(Camera);
