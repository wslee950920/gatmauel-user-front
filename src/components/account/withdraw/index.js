import React from "react";
import loadable from "@loadable/component";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const Confirm = loadable(() => import("./Confirm"));

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(5, 0, 10),
    color: "white",
  },
}));

const Withdraw = ({
  onChange,
  onSubmit,
  error,
  open,
  handleClickOpen,
  handleClose,
  value,
}) => {
  const classes = useStyles();

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
      {value === 1 && (
        <Confirm
          open={open}
          handleClose={handleClose}
          onChange={onChange}
          onSubmit={onSubmit}
          error={error}
        />
      )}
    </>
  );
};

export default React.memo(Withdraw);
