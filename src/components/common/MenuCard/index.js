import React, { useState, useCallback, useMemo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

const checkRange = (num) => {
  if (num > 10 || num < 1) return true;
  else return false;
};

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "100%", // 1:1
    width: 250,

    [theme.breakpoints.up("xs")]: {
      width: 300,
    },
    [theme.breakpoints.up("md")]: {
      width: 350,
    },
  },
  cart: {
    marginLeft: "auto",
  },
  textField: {
    width: "1.5rem",
  },
}));

const MenuCard = ({ handleClose }) => {
  const classes = useStyles();
  const [num, setNum] = useState(1);

  const addOnClick = useCallback(() => {
    if (num < 10 && num >= 1) setNum(num + 1);
    else if (num < 1) setNum(1);
    else setNum(10);
  }, [num]);
  const removeOnClick = useCallback(() => {
    if (num > 1 && num <= 10) setNum(num - 1);
    else if (num > 10) setNum(10);
    else setNum(1);
  }, [num]);
  const onChange = useCallback((e) => {
    const curValue = e.target.value;
    const newValue = curValue.replace(/[^0-9]/g, "");

    setNum(newValue);
  }, []);
  const ck = useMemo(() => checkRange(num), [num]);

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
        title="칼국수"
        subheader="7000원"
      />
      <CardMedia className={classes.media} image="images/menu/1.jpg" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          칼국수 + 겉절이 + 고추다데기
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="remove" onClick={removeOnClick}>
          <RemoveIcon />
        </IconButton>
        <TextField
          size="small"
          className={classes.textField}
          inputProps={{
            maxLength: 2,
            style: { textAlign: "center", fontFamily: "Roboto" },
          }}
          value={num}
          onChange={onChange}
          error={ck}
        />
        <IconButton aria-label="add" onClick={addOnClick}>
          <AddIcon />
        </IconButton>
        <IconButton
          className={classes.cart}
          aria-label="cart"
          onClick={handleClose}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default React.memo(MenuCard);
