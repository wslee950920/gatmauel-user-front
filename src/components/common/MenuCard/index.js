import React, { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

import { insertToCart } from "../../../modules/order";
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

import Circular from "../Circular";

const useStyles = makeStyles((theme) => ({
  media: {
    width: "100%",
    height: "auto",
  },
  cart: {
    marginLeft: "auto",
  },
  textField: {
    width: "1.5rem",
  },
  card: {
    width: 250,

    [theme.breakpoints.up("xs")]: {
      width: 300,
    },
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
  },
  header: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  content: {
    marginBottom: theme.spacing(8),
  },
}));

const MenuCard = ({ handleClose, food }) => {
  const classes = useStyles();
  const [num, setNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);
  const addOnClick = useCallback(() => {
    setNum((prevNum) => {
      if (prevNum < 10 && prevNum >= 1) return prevNum + 1;
      else if (prevNum < 1) return 1;
      else return 10;
    });
  }, []);
  const removeOnClick = useCallback(() => {
    setNum((prevNum) => {
      if (prevNum > 1 && prevNum <= 10) return prevNum - 1;
      else if (prevNum > 10) return 10;
      else return 1;
    });
  }, []);
  const onChange = useCallback((e) => {
    const curValue = e.target.value;
    const newValue = curValue.replace(/[^0-9]/g, "");

    setNum(newValue);
  }, []);
  const checkRange = useCallback((n) => {
    if (n > 10 || n < 1) return true;
    else return false;
  }, []);
  const addToCart = useCallback(() => {
    dispatch(
      insertToCart({ id: food.id, name: food.name, num, price: food.price })
    );
    setTimeout(() => {
      setNum(1);
    }, 500);
  }, [dispatch, food, num]);

  const insertComma = useMemo(() => {
    const result = String(food.price).split("");
    result.push("원");
    result.splice(-4, 0, ",");

    return result.join("");
  }, [food.price]);

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton
            aria-label="close"
            onClick={() => {
              handleClose();
              setTimeout(() => {
                setNum(1);
              }, 500);
            }}
          >
            <CloseIcon />
          </IconButton>
        }
        title={food.name}
        subheader={insertComma}
        titleTypographyProps={{ className: classes.header }}
      />
      <CardMedia
        component={() => {
          return (
            <>
              <img
                style={{
                  ...(loading ? { display: "none" } : { display: "block" }),
                }}
                alt={food.name}
                src={process.env.REACT_APP_CF_DOMAIN_NAME + food.img}
                onLoad={onLoad}
                className={classes.media}
              />
              {loading && (
                <Circular
                  container={{
                    width: "100%",
                    paddingTop: "100%",
                    position: "relative",
                  }}
                  inside={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: "auto",
                  }}
                />
              )}
            </>
          );
        }}
      />
      <CardContent {...(!food.deli && { className: classes.content })}>
        <Typography variant="body2" color="textSecondary" component="p">
          {food.compo}
        </Typography>
      </CardContent>
      {food.deli && (
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
            error={checkRange(num)}
          />
          <IconButton aria-label="add" onClick={addOnClick}>
            <AddIcon />
          </IconButton>
          <IconButton
            className={classes.cart}
            aria-label="cart"
            onClick={() => {
              if (!checkRange(num)) {
                addToCart();
                handleClose();
              }
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default React.memo(MenuCard);
