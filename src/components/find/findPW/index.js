import React from "react";
import { Link as RouterLink } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import PhoneFomatter from "../../common/Phone/PhoneFormatter";

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

const FindPW = ({ nickname, phone, email, onChange, error, onSubmit }) => {
  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={onSubmit} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="닉네임"
        name="nickname"
        size="small"
        InputProps={{ className: classes.fontRobo }}
        value={nickname}
        onChange={onChange}
        error={error.nickname}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="이메일"
        name="email"
        size="small"
        InputProps={{ className: classes.fontRobo }}
        type="email"
        value={email}
        onChange={onChange}
        error={error.email}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="phone"
        label="전화번호"
        size="small"
        InputProps={{
          className: classes.fontRobo,
          inputComponent: PhoneFomatter,
        }}
        type="tel"
        value={phone}
        onChange={onChange}
        error={error.phone}
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

export default FindPW;
