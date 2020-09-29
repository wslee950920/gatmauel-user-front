import React, { useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import Copyright from "../footer/Copyright";
import KakaoBtn from "./KakaoBtn";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: theme.palette.primary.light,
  },
  formCtrLabel: {
    fontSize: "0.8rem",
    color: "#707070",
  },
  fontRobo: {
    fontFamily: "Roboto",
  },
  kakaoBtn: {
    padding: 0,
  },
  divider: {
    margin: theme.spacing(2),
  },
}));

const LogIn = () => {
  const classes = useStyles();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="logo192.png" />
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
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="로그인 유지"
            classes={{ label: classes.formCtrLabel }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
          >
            로그인
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                component={RouterLink}
                to="/find"
                variant="caption"
                color="textSecondary"
                TypographyClasses={{ caption: classes.fontRobo }}
              >
                ID/PW찾기
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
      </div>
      <Divider variant="middle" className={classes.divider} />
      <KakaoBtn />
      <Copyright />
    </Container>
  );
};

export default LogIn;
