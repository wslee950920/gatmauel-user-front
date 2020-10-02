import React, { useState } from "react";

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
    marginBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(0.5, 1.5),
    height: "10rem",
  },
}));

const Feed = ({ data }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar aria-label="avatar" />}
        action={
          <IconButton aria-label="more">
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
      <CardMedia className={classes.media} image="images/menu/1.jpg" />
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
  );
};

export default React.memo(Feed);
