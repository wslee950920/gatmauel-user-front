import React, { useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import Copyright from "../common/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.light,
  },
  fontMaple: {
    fontFamily: "MaplestoryOTFBold",
  },
  fontRobo: {
    fontFamily: "Roboto",
  },
  divider: {
    margin: theme.spacing(2),
  },
  field: {
    width: "100%",
    display: "flex",
  },
  button: {
    height: "auto",
    margin: theme.spacing(2, 1, 1),
    color: "white",
    fontFamily: "Roboto",
    textDecoration: "line-through",
  },
  disabled: {
    textDecoration: "line-through",
  },
}));

const Profile = () => {
  const classes = useStyles();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <AccountCircleIcon
          fontSize="large"
          color="action"
          className={classes.icon}
        />
        <Typography component="h1" variant="h5">
          내 정보
        </Typography>
        <div style={{ width: "100%" }} className={classes.divider}>
          <Divider variant="fullWidth" />
        </div>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nickname"
            label="별명"
            name="nickname"
            size="small"
            InputProps={{ className: classes.fontMaple }}
            value="맨유경비원"
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
            InputProps={{ className: classes.fontMaple }}
            value="amicusadaras6@gmail.com"
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="address"
            label="시/군/구"
            id="address"
            size="small"
            InputProps={{ className: classes.fontMaple }}
            InputLabelProps={{ classes: { root: classes.disabled } }}
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="detail"
            label="상세주소"
            id="detail"
            size="small"
            InputProps={{ className: classes.fontMaple }}
            InputLabelProps={{ classes: { root: classes.disabled } }}
            disabled
          />
          <div className={classes.field}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="phone"
              label="전화번호"
              id="phone"
              size="small"
              InputProps={{ className: classes.fontMaple }}
              InputLabelProps={{ classes: { root: classes.disabled } }}
              type="tel"
              disabled
            />
            <Button variant="contained" className={classes.button} disabled>
              인증
            </Button>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
          >
            저장
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
                로그아웃
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Profile;
