import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from '@material-ui/core/LinearProgress';

import Circular from '../common/Circular';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "100%", // 1:1
  },
  card: {
    maxWidth: theme.breakpoints.values.sm,
  },
  content: {
    padding: theme.spacing(0, 2),
    minHeight: "8rem",
  },
  pTag: {
    fontFamily: "NanumSquare",
    whiteSpace: "pre-wrap",
  },
  hContent:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    height:40
  }
}));

const TitleLinearProgress = withStyles((theme) => ({
    root: {
      height: 15,
      width: 100
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[100],
    },
    bar: {
      backgroundColor: theme.palette.grey[200],
    },
  }))(LinearProgress);
const SubLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      width: 60
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[100],
    },
    bar: {
      backgroundColor: theme.palette.grey[200],
    },
  }))(({ classes })=><LinearProgress variant='indeterminate' classes={{
      root:classes.root, 
      colorPrimary:classes.colorPrimary, 
      bar:classes.bar
    }}
  />
);

const LoadingItem = () => {
  const classes = useStyles();

  return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar aria-label="avatar" />}
          title={<TitleLinearProgress/>}
          subheader={<SubLinearProgress/>}
          disableTypography
          classes={{content:classes.hContent}}
        />
        {/**CardMedia에 props를 줬더니 CarouselImg컴포넌트가 받더라... */}
        <CardMedia
            className={classes.media}
            component={Circular}
            container={{
                width: "100%",
                paddingTop: "100%",
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
        <CardContent classes={{ root: classes.content }}>
          <br/>
          <Typography variant="body1" className={classes.pTag}>
            {'loading...'}
          </Typography>
        </CardContent>
      </Card>
  );
};

export default LoadingItem;
