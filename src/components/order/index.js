import React, { useState, useCallback, useEffect } from "react";
import loadable from "@loadable/component";
import { Link as RouterLink } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import useInsertComma from "../../lib/useInsertComma";

import OrderList from "../common/Order/OrderList";
import SelectTab from "./SelectTab";
const InfoDialog = loadable(() => import("../common/InfoDialog"));

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.primary.light,
  },
  label: {
    color: theme.palette.common.white,
  },
  container: {
    border: "solid #dcdcdc",
    borderRadius: "8px",
    backgroundColor: "white",
  },
  root: {
    padding: theme.spacing(0.8),
    height: "100%",
  },
  total: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(2, 1.5, 0),
  },
  size: {
    fontSize: "1rem",
  },
}));

const Order = ({ order, value, handleChange, getTotal }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const insertComma = useInsertComma;

  const DialogOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const DialogClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Container maxWidth="xs" className={classes.container}>
          <OrderList order={order} />
        </Container>
        <Container maxWidth="xs" disableGutters>
          <Button
            fullWidth
            variant="contained"
            className={classes.btn}
            color="primary"
            component={RouterLink}
            to="/menu"
            classes={{ label: classes.label }}
          >
            더 주문하기+
          </Button>
          <SelectTab
            value={value}
            handleChange={handleChange}
            handleOpen={DialogOpen}
          />
          <div className={classes.total}>
            <div className={classes.size}>총액 : </div>
            <div className={classes.size}>{insertComma(getTotal)}</div>
          </div>
          <Button
            fullWidth
            variant="contained"
            className={classes.btn}
            color="primary"
            classes={{ label: classes.label }}
            component={RouterLink}
            to={value === 0 ? "/payment/pickup" : "/payment/delivery"}
          >
            {value === 0 ? "포장 주문하기" : "배달 주문하기"}
          </Button>
        </Container>
      </div>
      {value === 1 && <InfoDialog open={open} handleClose={DialogClose} />}
    </>
  );
};

export default React.memo(Order);
