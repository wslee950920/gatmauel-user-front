import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import OrderList from "../common/Order/OrderList";
import Money from "../common/Order/Money";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "solid #dcdcdc",
    borderRadius: "8px",
  },
  root: {
    padding: theme.spacing(0.8),
  },
}));

const Result = ({ order, getTotal, charge }) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Container maxWidth="xs" className={classes.container}>
          <OrderList order={order} result />
        </Container>
        <Container maxWidth="xs" disableGutters>
          <Money getTotal={getTotal} charge={charge} />
        </Container>
      </div>
    </>
  );
};

export default React.memo(Result);
