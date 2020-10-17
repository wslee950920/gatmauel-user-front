import React, { useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Copyright from "../footer/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: "7.5rem",
    height: "7.5rem",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
    backgroundColor: theme.palette.primary.light,
  },

  fontRobo: {
    fontFamily: "Roboto",
  },
}));

const Register = () => {
  const classes = useStyles();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src="images/icons/logo192.png" />
          <Typography component="h1" variant="h5">
            <Link component={RouterLink} to="/" color="inherit">
              갯마을
            </Link>
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="별명"
              name="nickname"
              autoFocus
              size="small"
              InputProps={{ className: classes.fontRobo }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              size="small"
              type="email"
              InputProps={{ className: classes.fontRobo }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm"
              label="비밀번호 확인"
              type="password"
              id="confirm"
              size="small"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              color="primary"
            >
              회원가입
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
                  이미 회원이신가요?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Copyright />
      </Container>
    </>
  );
};

export default Register;
