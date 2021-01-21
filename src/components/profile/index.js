import React from "react";
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
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import AddrDialog from "../common/Address/AddrDialog";

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
    backgroundColor: theme.palette.primary.light,
  },
}));

const Profile = ({
  onLogout,
  info,
  nickname,
  error,
  onChange,
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
  detailChange,
  clearAddress,
  addrRef,
  handleMouseDown,
  detailRef,
  handleOnExit,
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
              value={info && info.email ? info.email : ""}
              disabled
            />
            <FormControl
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
            >
              <InputLabel htmlFor="outlined-adornment-address">
                시/군/구
              </InputLabel>
              <OutlinedInput
                fullWidth
                name="address"
                id="outlined-adornment-address"
                label="시/군/구"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear address"
                      edge="end"
                      onMouseDown={handleMouseDown}
                      onClick={clearAddress}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                }
                inputRef={addrRef}
                inputProps={{
                  className: classes.fontMaple,
                  onClick: handleClickOpen,
                }}
                value={addr}
                error={error.addr}
              />
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="detail"
              label="상세주소"
              size="small"
              InputProps={{ className: classes.fontMaple }}
              value={detail}
              onChange={detailChange}
              error={error.detail}
              inputRef={detailRef}
            />
            <div className={classes.field}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="phone"
                label="전화번호"
                size="small"
                InputProps={{ className: classes.fontMaple }}
                type="tel"
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
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
        handleOnExit={handleOnExit}
      />
    </>
  );
};

export default React.memo(Profile);
