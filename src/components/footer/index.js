import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";
import Link from "@material-ui/core/Link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#dcdcdc",
    padding: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
  },
  typo: {
    display: "flex",
    justifyContent: "flex-end",
  },
  footer: {
    display: "flex",
    alignItems: "flex-end",

    [theme.breakpoints.up("xs")]: {
      display: "block",
      alignItems: "stretch",
    },
  },
  info: { fontFamily: "Roboto" },
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
      <Link href="tel:0314159300" className={classes.link} color="textPrimary">
        <PhoneForwardedIcon />
        <Typography variant="caption" className={classes.info}>
          031.415.9300
        </Typography>
      </Link>
      <footer className={classes.footer}>
        <div className={classes.typo}>
          <Typography variant="caption" className={classes.info}>
            Gatmauel made by WSL
          </Typography>
        </div>
        {matches && (
          <div className={classes.typo}>
            <Typography variant="caption" className={classes.info}>
              Plz feedback to. wslee950920@gmail.com
            </Typography>
          </div>
        )}
      </footer>
    </Container>
  );
};

export default Footer;
