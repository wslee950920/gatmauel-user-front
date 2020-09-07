import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";
import Link from "@material-ui/core/Link";

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
  info: { fontFamily: "Roboto" },
  link: {
    display: "flex",
    alignItems: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.background}>
      <Link href="tel:0314159300" className={classes.link} color="textPrimary">
        <PhoneForwardedIcon />
        <Typography variant="caption" className={classes.info}>
          031.415.9300
        </Typography>
      </Link>
      <footer>
        <div className={classes.typo}>
          <Typography variant="caption" className={classes.info}>
            Gatmauel made by WSL
          </Typography>
        </div>
        <div className={classes.typo}>
          <Typography variant="caption" className={classes.info}>
            Plz feedback to. wslee950920@gmail.com
          </Typography>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
