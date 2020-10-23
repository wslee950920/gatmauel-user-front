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
}));

const Feed = ({ data, index }) => {
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
            <IconButton
              aria-label="more"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title="맨유경비원"
          subheader="20/09/29"
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
        />
        <CardContent classes={{ root: classes.content }}>
          <MobileStepper
            variant="dots"
            steps={3}
            position="static"
            activeStep={activeStep}
            className={classes.stepper}
          />
          <Typography variant="body2" color="textSecondary">
            {data.text}
          </Typography>
        </CardContent>
      </Card>
      <FeedMenu handleClose={handleClose} anchorEl={anchorEl} />
    </>
  );
};

export default React.memo(Feed);
