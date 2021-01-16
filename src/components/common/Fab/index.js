import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

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
  },
  textField: {
    width: "1.5rem",
  },
}));

const FabBtn = ({ order }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = useMemo(() => {
    return Boolean(anchorEl);
  }, [anchorEl]);
  const id = useMemo(() => {
    return open ? "order-popover" : undefined;
  }, [open]);

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
          <ShoppingCartIcon />
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
      >
        {order.map((v, i) => (
          <SnackbarContent
            message={v.name}
            className={classes.content}
            key={i}
            action={
              <>
                <IconButton aria-label="sub">
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
                />
                <IconButton aria-label="add">
                  <AddIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="close">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
        ))}
      </Popover>
    </>
  );
};

FabBtn.propTypes = {
  order: PropTypes.array.isRequired,
};

export default React.memo(FabBtn);
