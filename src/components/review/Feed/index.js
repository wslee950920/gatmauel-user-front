import React, { useState, useCallback, useContext } from "react";
import StepContext from "../context/step";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MobileStepper from "@material-ui/core/MobileStepper";

import FeedMenu from "./FeedMenu";
import CarouselImg from "./CarouselImg";

import kTime from "../../../lib/kTime";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "100%", // 1:1
  },
  card: {
    maxWidth: theme.breakpoints.values.sm,
  },
  subHeader: {
    fontFamily: "Roboto",
  },
  stepper: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginBottom: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(0.5, 1),
    height: "10rem",
  },
  ns: {
    fontFamily: "NanumSquare",
  },
}));

const Feed = ({ data, index, user, feedUpdate }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { state, action } = useContext(StepContext);
  const [activeStep, setActiveStep] = useState(state.steps[index]);

  const handleClick = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const handleSelect = useCallback(
    (selectedIndex, e) => {
      setActiveStep(selectedIndex);
      action.setSteps((steps) =>
        steps.map((step, i) => (i === index ? (step = selectedIndex) : step))
      );
    },
    [index, action]
  );

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar aria-label="avatar" />}
          action={
            user &&
            data.userId === user.id && (
              <IconButton
                aria-label="more"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={data.nick}
          subheader={kTime(data.createdAt)}
          subheaderTypographyProps={{
            variant: "caption",
            className: classes.subHeader,
          }}
        />
        {/**CardMedia에 props를 줬더니 CarouselImg컴포넌트가 받더라... */}
        <CardMedia
          className={classes.media}
          component={CarouselImg}
          activeIndex={activeStep}
          handleSelect={handleSelect}
          imgs={data.imgs}
        />
        <CardContent classes={{ root: classes.content }}>
          {data.imgs.split("||").length > 1 ? (
            <MobileStepper
              variant="dots"
              steps={data.imgs.split("||").length}
              position="static"
              activeStep={activeStep}
              className={classes.stepper}
            />
          ) : (
            <br />
          )}
          <Typography variant="body1" className={classes.ns}>
            {data.content}
          </Typography>
        </CardContent>
      </Card>
      <FeedMenu
        handleClose={handleClose}
        anchorEl={anchorEl}
        feedUpdate={feedUpdate}
        index={index}
      />
    </>
  );
};

export default React.memo(Feed);
