import React, { useCallback, useState } from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Confirm from "./Confirm";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(5, 0, 10),
    color: "white",
  },
}));

const Withdraw = ({ onChange, onSubmit, error }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        className={classes.button}
        color="secondary"
        onClick={handleClickOpen}
      >
        회원 탈퇴
      </Button>
      <Confirm
        open={open}
        handleClose={handleClose}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </>
  );
};

export default React.memo(Withdraw);
