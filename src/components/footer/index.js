import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#dcdcdc",
    padding: "0.5rem",
  },
  typo: {
    display: "flex",
    justifyContent: "flex-end",
  },
  info: { fontFamily: "Roboto" },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.background}>
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
