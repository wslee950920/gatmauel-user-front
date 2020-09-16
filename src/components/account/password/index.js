import React, { useCallback } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
    backgroundColor: theme.palette.primary.light,
  },
  fontFam: {
    fontFamily: "MaplestoryOTFBold",
  },
}));

const Password = () => {
  const classes = useStyles();
  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <form className={classes.form} noValidate onSubmit={onSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="old"
        label="현재 PW"
        name="old"
        size="small"
        InputProps={{ className: classes.fontFam }}
        type="password"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="new"
        label="새 PW"
        name="new"
        size="small"
        InputProps={{ className: classes.fontFam }}
        type="password"
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="confirm"
        label="PW 확인"
        id="confirm"
        size="small"
        InputProps={{ className: classes.fontFam }}
        type="password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.submit}
        color="primary"
      >
        변경
      </Button>
    </form>
  );
};

export default Password;
