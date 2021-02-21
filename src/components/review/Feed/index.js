import React, { useState, useCallback, useContext } from "react";
import loadable from "@loadable/component";

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
import Button from "@material-ui/core/Button";

import CarouselImg from "./CarouselImg";
import StepContext from "../context/step";

import useTime from "../../../lib/useTime";

const FeedMenu = loadable(() => import("./FeedMenu"));

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
  },
  content: {
    padding: theme.spacing(0, 2),
    minHeight: "8rem",
  },
  typo: {
    fontFamily: "NanumSquare",
  },
  text: {
    padding: 0,
  },
  btn: {
    fontFamily: "NanumSquare",
  },
  root: {
    fontSize: "1rem",
    lineHeight: "inherit",
    minWidth: 0,
  },
}));

const Feed = ({
  data,
  index,
  user,
  feedUpdate,
  openRemove,
  measure,
  hashtagOnClick,
}) => {
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
          subheader={useTime(data.createdAt)}
          subheaderTypographyProps={{
            variant: "caption",
            className: classes.subHeader,
          }}
        />
        {/**CardMedia에 props를 줬더니 CarouselImg컴포넌트가 받더라... */}
        {data.imgs && (
          <CardMedia
            className={classes.media}
            component={CarouselImg}
            activeIndex={activeStep}
            handleSelect={handleSelect}
            imgs={data.imgs}
            measure={measure}
          />
        )}
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
            data.imgs && <br />
          )}
          <Typography variant="body1" className={classes.typo}>
            {data.content.split("\n").map((line, outer) => {
              return (
                <span key={`${index}-${outer}`}>
                  {line.split(" ").map((value, inner) => {
                    if (/#[^\s]*/.test(value)) {
                      return (
                        <span key={`${value}-${inner}-${index}`}>
                          <Button
                            classes={{
                              text: classes.text,
                              root: classes.root,
                            }}
                            className={classes.btn}
                            color="primary"
                            disableRipple={true}
                            onClick={() => hashtagOnClick(value)}
                          >
                            {value}
                          </Button>
                          <span> </span>
                        </span>
                      );
                    } else {
                      return `${value} `;
                    }
                  })}
                  <br />
                </span>
              );
            })}
          </Typography>
        </CardContent>
      </Card>
      {user && (
        <FeedMenu
          handleClose={handleClose}
          anchorEl={anchorEl}
          feedUpdate={feedUpdate}
          index={index}
          openRemove={openRemove}
          reviewId={data.id}
        />
      )}
    </>
  );
};

export default React.memo(Feed);
