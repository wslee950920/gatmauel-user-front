import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";
import Link from "@material-ui/core/Link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ScheduleIcon from "@material-ui/icons/Schedule";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#dcdcdc",
    padding: theme.spacing(1),
    width: "100%",
    position: "absolute",
    bottom: -57.43,
  },
  background: {
    backgroundColor: "#dcdcdc",
    padding: theme.spacing(1),
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-start",

    [theme.breakpoints.up("xs")]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  info: { fontFamily: "Roboto", color: "black" },
  link: {
    display: "flex",
    alignItems: "center",
  },
}));

const Footer = ({ main }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xs"));

  return (
    <footer className={main ? classes.main : classes.background}>
      <div className={classes.footer}>
        <div>
          <ScheduleIcon fontSize="small" />
          <Typography variant="caption" className={classes.info}>
            11:00~22:00/매월 셋째주 월요일 휴무
          </Typography>
        </div>
        {matches && (
          <Typography variant="caption" className={classes.info}>
            Gatmauel made by WSL
          </Typography>
        )}
      </div>
      <div className={classes.footer}>
        <Link
          href="tel:0314159300"
          className={classes.link}
          color="textPrimary"
        >
          <PhoneForwardedIcon fontSize="small" />
          <Typography variant="caption" className={classes.info}>
            031.415.9300
          </Typography>
        </Link>
        {matches && (
          <Link
            href="mailto:gatmauel9300@gmail.com"
            color="textPrimary"
            className={classes.link}
          >
            <Typography variant="caption" className={classes.info}>
              Plz feedback to. gatmauel9300@gmail.com
            </Typography>
          </Link>
        )}
      </div>
    </footer>
  );
};

export default Footer;
