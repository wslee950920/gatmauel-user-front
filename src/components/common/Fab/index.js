import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Popover from "@material-ui/core/Popover";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Link from "@material-ui/core/Link";
import Badge from "@material-ui/core/Badge";

import {
  removeOrder,
  addOrder,
  subOrder,
  changeOrder,
} from "../../../modules/order";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(2),
    zIndex: 1300,
    color: theme.palette.grey[200],
    backgroundColor: theme.palette.primary.light,

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  content: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey[900],
    marginBottom: theme.spacing(0.5),
    minWidth: 288,
  },
  textField: {
    width: "1.5rem",
  },
  paper: {
    backgroundColor: "rgba( 0, 0, 0, 0 )",
  },
  total: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey[900],
    marginBottom: theme.spacing(0.5),
    minWidth: 288,
    fontFamily: "Roboto",
    fontSize: "1rem",
    textDecoration: "underline",
  },
}));

const FabBtn = ({ order }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const open = useMemo(() => {
    return Boolean(anchorEl);
  }, [anchorEl]);
  const id = useMemo(() => {
    return open ? "order-popover" : undefined;
  }, [open]);
  const getTotal = useMemo(() => {
    return order.reduce(
      (prev, value) => prev + value.price * (value.num === "" ? 0 : value.num),
      0
    );
  }, [order]);

  const insertComma = useCallback((total) => {
    const result = String(total).split("");
    result.push("원");
    result.splice(-4, 0, ",");

    return result.join("");
  }, []);
  const handleOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const checkRange = useCallback((n) => {
    if (n > 10 || n < 1) return true;
    else return false;
  }, []);
  const removeOnClick = useCallback(
    (index) => {
      dispatch(removeOrder(index));
    },
    [dispatch]
  );
  const addOnClick = useCallback(
    (index) => {
      if (order[index].num === "") {
        dispatch(addOrder(index));
      } else if (order[index].num < 10) {
        dispatch(addOrder(index));
      }
    },
    [dispatch, order]
  );
  const subOnClick = useCallback(
    (index) => {
      if (order[index].num === "") {
        dispatch(subOrder(index));
      } else if (order[index].num > 1) {
        dispatch(subOrder(index));
      }
    },
    [dispatch, order]
  );
  const onChange = useCallback(
    (e, index) => {
      const curValue = e.target.value;
      const newValue = curValue.replace(/[^0-9]/g, "");

      if (newValue === "") {
        dispatch(changeOrder({ index, num: newValue }));
      } else if (parseInt(newValue) > 0 && parseInt(newValue) < 11) {
        dispatch(changeOrder({ index, num: parseInt(newValue) }));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (order.length === 0) {
      setAnchorEl(null);
    }
  }, [order]);

  return (
    <>
      <Zoom
        unmountOnExit
        key="shopping-cart"
        in={order.length > 0}
        timeout={{
          enter: theme.transitions.duration.enteringScreen,
          exit: theme.transitions.duration.leavingScreen,
        }}
      >
        <Fab
          aria-label="shopping-cart"
          className={classes.fab}
          color="primary"
          onClick={handleOpen}
          aria-describedby={id}
        >
          <Badge badgeContent={order.length}>
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      </Zoom>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        PaperProps={{ className: classes.paper }}
      >
        {order.map((v, i) => (
          <SnackbarContent
            message={v.name}
            className={classes.content}
            key={i}
            action={
              <>
                <IconButton aria-label="sub" onClick={() => subOnClick(i)}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <TextField
                  size="small"
                  className={classes.textField}
                  inputProps={{
                    maxLength: 2,
                    style: { textAlign: "center", fontFamily: "Roboto" },
                  }}
                  value={v.num}
                  error={checkRange(v.num)}
                  onChange={(e) => onChange(e, i)}
                />
                <IconButton aria-label="add" onClick={() => addOnClick(i)}>
                  <AddIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="close" onClick={() => removeOnClick(i)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
        ))}
        <SnackbarContent
          message={`총액 : ${insertComma(getTotal)}`}
          action={
            <Link component={RouterLink} to="/order">
              주문하기
            </Link>
          }
          className={classes.total}
        />
      </Popover>
    </>
  );
};

FabBtn.propTypes = {
  order: PropTypes.array.isRequired,
};

export default React.memo(FabBtn);
