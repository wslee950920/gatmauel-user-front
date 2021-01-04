import React from "react";

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
  fontMaple: {
    fontFamily: "MaplestoryOTFBold",
  },
}));

const Password = ({ error, onChange, onSubmit }) => {
  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="현재 PW"
        name="oldPass"
        size="small"
        InputProps={{ className: classes.fontMaple }}
        type="password"
        onChange={onChange}
        error={error.res}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="새 PW"
        name="newPass"
        size="small"
        InputProps={{ className: classes.fontMaple }}
        type="password"
        error={error.comp}
        onChange={onChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="confirm"
        label="PW 확인"
        size="small"
        InputProps={{ className: classes.fontMaple }}
        type="password"
        error={error.comp}
        onChange={onChange}
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

export default React.memo(Password);
