import React, { useState, useCallback, useMemo } from "react";
import loadable from "@loadable/component";
import { Link as RouterLink } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import useInsertComma from "../../lib/useInsertComma";

import OrderList from "./OrderList";
import SelectTab from "./SelectTab";
const InfoDialog = loadable(() => import("../common/InfoDialog"));

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: theme.palette.primary.light,
  },
  label: {
    color: theme.palette.common.white,
  },
  container: {
    border: "solid #dcdcdc",
    borderRadius: "8px",
  },
  root: {
    padding: theme.spacing(0.8),
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

const Order = ({ order, value, handleChange }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const insertComma = useInsertComma;

  const getTotal = useMemo(() => {
    const temp = order.reduce(
      (prev, value) => prev + value.price * (value.num === "" ? 0 : value.num),
      0
    );

    if (value === 0) return temp;
    else if (value === 1) {
      if (temp >= 40000) {
        return temp;
      } else if (temp >= 27000 && temp < 40000) {
        const result = temp + 500;

        return result;
      } else if (temp < 27000) {
        const result = temp + 1000;

        return result;
      }
    }
  }, [order, value]);

  const DialogOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const DialogClose = useCallback(() => {
    setOpen(false);
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
            style={{ marginTop: theme.spacing(1.5) }}
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
