import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Slide from "@material-ui/core/Slide";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import Write from "../Write";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(0.5),
  },
  root: {
    marginBottom: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className={classes.root}>
        <CssBaseline />
        <Container maxWidth="sm">
          <div className={classes.header}>
            <Button onClick={handleClose} color="secondary">
              취소
            </Button>
            <Button>완료</Button>
          </div>
          <Divider />
        </Container>
      </div>
      <Write dialog />
    </Dialog>
  );
};

export default React.memo(FullScreenDialog);
