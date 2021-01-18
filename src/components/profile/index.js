import React, { useState, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import AddrDialog from "./AddrDialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    margin: theme.spacing(1),
    width: "5rem",
    height: "5rem",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
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

const Profile = ({ onLogout, info, nickname, error, onChange, onSubmit }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
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
          <form className={classes.form} onSubmit={onSubmit}>
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
              value={nickname}
              onChange={onChange}
              error={error.nick}
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
              value={info ? info.email : ""}
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
              onClick={handleClickOpen}
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
                  to="/"
                  variant="caption"
                  color="textSecondary"
                  TypographyClasses={{ caption: classes.fontRobo }}
                  onClick={onLogout}
                >
                  로그아웃
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <AddrDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default React.memo(Profile);
