import React, { useState, useCallback, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import OrderList from "./OrderList";
import SelectTab from "./SelectTab";
import InfoDialog from "./InfoDialog";

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

const Order = ({ order, info }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [iOpen, setIOpen] = useState(false);

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
      } else if (temp >= 14000 && temp < 27000) {
        const result = temp + 1000;

        return result;
      }
    }
  }, [order, value]);

  const insertComma = useCallback((total) => {
    const result = String(total).split("");
    result.push("원");
    result.splice(-4, 0, ",");

    return result.join("");
  }, []);
  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);
  const DialogOpen = useCallback(() => {
    setIOpen(true);
  }, []);
  const DialogClose = useCallback(() => {
    setIOpen(false);
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
            component={RouterLink}
            to={value === 0 ? "/pickup" : "/deli"}
            style={{ marginTop: theme.spacing(1.5) }}
            classes={{ label: classes.label }}
          >
            {value === 0 ? "포장 주문하기" : "배달 주문하기"}
          </Button>
          <InfoDialog open={iOpen} handleClose={DialogClose} />
        </Container>
      </div>
    </>
  );
};

export default React.memo(Order);
