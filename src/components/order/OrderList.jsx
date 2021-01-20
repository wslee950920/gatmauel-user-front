import React, {useCallback} from 'react';
import { useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";

import {
    removeOrder,
    addOrder,
    subOrder,
    changeOrder,
} from "../../modules/order";

const useStyles=makeStyles((theme)=>({
    root:{
        width:'100%',
        maxHeight:'45vh',
        overflow: 'auto',
    },
    textField: {
        width: "1.5rem",
    },
    bottom:{
        height:'3rem',
        display:'flex',
        justifyContent:'flex-end'
    },
    bottomRoot:{
        paddingTop:theme.spacing(0),
        paddingBottom:theme.spacing(0)
    },
    topRoot:{
        paddingBottom:theme.spacing(0)
    },
}))

const OrderList=({order})=>{
    const classes=useStyles();
    const dispatch = useDispatch();

    const insertComma = useCallback((num) => {
        const result = String(num).split("");
        result.push("원");
        result.splice(-4, 0, ",");
    
        return result.join("");
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

    return(
        <List className={classes.root}>
            {order.map((v, i)=>(
                <li key={i}>
                    <ListItem 
                        alignItems='flex-start' 
                        component='div'
                        classes={{root:classes.topRoot}}
                        disableGutters
                    >
                        <ListItemAvatar>
                            <Avatar 
                                alt={v.name} 
                                src={process.env.REACT_APP_CF_DOMAIN_NAME+v.img} 
                                variant='square'
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={v.name}
                            secondary={insertComma(v.price)}
                        />    
                    </ListItem>
                    <ListItem 
                        component='div' 
                        divider={i!==order.length-1} 
                        className={classes.bottom}
                        classes={{root:classes.bottomRoot}}
                        disableGutters
                    >
                        <>
                            <IconButton aria-label="sub" onClick={() => subOnClick(i)}>
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            <TextField
                                size="small"
                                className={classes.textField}
                                inputProps={{
                                    maxLength: 2,
                                    style: { 
                                        textAlign: "center", 
                                        fontFamily: "Roboto" 
                                    },
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
                    </ListItem>
                </li>
            ))}
        </List>
    );
}

export default React.memo(OrderList);