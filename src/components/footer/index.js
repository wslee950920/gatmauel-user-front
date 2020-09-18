import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";
import Link from "@material-ui/core/Link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ScheduleIcon from "@material-ui/icons/Schedule";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#dcdcdc",
    padding: "0.5rem",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",

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

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xs"));

  return (
    <Container maxWidth="xl" className={classes.background}>
      <footer className={classes.footer}>
        <div>
          <ScheduleIcon fontSize="small" />
          <Typography variant="caption" className={classes.info}>
            11:00~21:30/매월 셋째주 수요일 휴무
          </Typography>
        </div>
        {matches && (
          <div>
            <Typography variant="caption" className={classes.info}>
              Gatmauel made by WSL
            </Typography>
          </div>
        )}
      </footer>
      <footer className={classes.footer}>
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
          <div>
            <Typography
              variant="caption"
              className={classes.info}
              component={Link}
              href="mailto:wslee950920@gmail.com"
            >
              Plz feedback to. wslee950920@gmail.com
            </Typography>
          </div>
        )}
      </footer>
    </Container>
  );
};

export default Footer;
