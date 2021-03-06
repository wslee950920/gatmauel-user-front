import React from "react";
import loadable from "@loadable/component";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import AddrInput from "../common/Address/AddrInput";
import PhoneVerify from "../common/Phone/PhoneVerify";
const AddrDialog = loadable(() => import("../common/Address/AddrDialog"));

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
    backgroundColor: "white",
  },
  fontRobo: {
    fontFamily: "Roboto",
  },
  divider: {
    margin: theme.spacing(2),
  },
}));

const Profile = ({
  onLogout,
  info,
  nickname,
  error,
  nickChange,
  onSubmit,
  kakao,
  loadNextPage,
  loading,
  hasNextPage,
  queryOnChange,
  query,
  addr,
  addrOnClick,
  open,
  handleClickOpen,
  handleClose,
  detail,
  onChange,
  clearAddress,
  addrRef,
  handleMouseDown,
  detailRef,
  phone,
  phoneChange,
  checkPhone,
  timer,
  verify,
  confirmPhone,
  code,
  platform,
}) => {
  const classes = useStyles();

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
              onChange={nickChange}
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
              value={info && info.email ? info.email : ""}
              disabled
            />
            <AddrInput
              handleMouseDown={handleMouseDown}
              clearAddress={clearAddress}
              addrRef={addrRef}
              addr={addr}
              error={{
                addr: error.addr,
                detail: error.detail,
              }}
              handleClickOpen={handleClickOpen}
              detail={detail}
              detailChange={onChange}
              detailRef={detailRef}
              value={0}
            />
            <PhoneVerify
              phone={phone}
              phoneChange={phoneChange}
              checkPhone={checkPhone}
              verify={verify}
              error={{ code: error.code }}
              timer={timer}
              codeOnChange={onChange}
              code={code}
              confirmPhone={confirmPhone}
              value={1}
            />
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
                  variant="caption"
                  color="textSecondary"
                  TypographyClasses={{ caption: classes.fontRobo }}
                  onClick={onLogout}
                  component="button"
                >
                  로그아웃
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      {platform && (
        <AddrDialog
          open={open}
          handleClose={handleClose}
          kakao={kakao}
          loadNextPage={loadNextPage}
          loading={loading}
          hasNextPage={hasNextPage}
          queryOnChange={queryOnChange}
          query={query}
          addrOnClick={addrOnClick}
        />
      )}
    </>
  );
};

export default React.memo(Profile);
