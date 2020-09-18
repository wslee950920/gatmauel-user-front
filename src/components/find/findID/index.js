import React, { useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
    backgroundColor: theme.palette.primary.light,
  },
  fontRobo: {
    fontFamily: "Roboto",
  },
}));

const FindId = () => {
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
        id="name"
        label="이름"
        name="name"
        size="small"
        InputProps={{ className: classes.fontRobo }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="phone"
        label="전화번호"
        name="phone"
        size="small"
        InputProps={{ className: classes.fontRobo }}
        type="tel"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.submit}
        color="primary"
      >
        확인
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link
            component={RouterLink}
            to="/login"
            variant="caption"
            color="textSecondary"
            TypographyClasses={{ caption: classes.fontRobo }}
          >
            로그인
          </Link>
        </Grid>
        &nbsp;&nbsp;&nbsp;
        <Grid item>
          <Link
            component={RouterLink}
            to="/register"
            variant="caption"
            color="textSecondary"
            TypographyClasses={{ caption: classes.fontRobo }}
          >
            회원가입
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default FindId;
