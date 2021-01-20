import React from "react";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(0.5),
    position: "relative",
    display: "flex",
  },
  text: {
    fontSize: "1rem",
    paddingTop: theme.spacing(0.8),
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Payment = ({ open, handleClose, deli }) => {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <>
        <CssBaseline />
        <Container maxWidth="sm">
          <div className={classes.header}>
            <IconButton onClick={handleClose} edge="start" size="small">
              <ArrowBackIosIcon />
            </IconButton>
            <div className={classes.text}>
              {!!deli ? "배달 결제하기" : "포장 결제하기"}
            </div>
          </div>
        </Container>
        {!!deli && <div>배달</div>}
        <div>포장</div>
      </>
    </Dialog>
  );
};

export default React.memo(Payment);
