import React, {useCallback} from 'react';
import { useDispatch } from "react-redux";
import loadable from '@loadable/component';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import {
    removeOrder,
    addOrder,
    subOrder,
    changeOrder,
} from "../../../modules/order";

const OrderItem=loadable(()=>import('./OrderItem'));

const useStyles=makeStyles((theme)=>({
    root:{
        width:'100%',
        maxHeight:'45vh',
        overflow:'auto',
        minHeight:64
    },
}))

const OrderList=({order, result})=>{
    const classes=useStyles();
    const dispatch = useDispatch();

    const removeOnClick = useCallback(
      (index) => {
        dispatch(removeOrder(index));
      }, [dispatch]);
    const addOnClick = useCallback(
      (index) => {
        if (order[index].num === "") {
          dispatch(addOrder(index));
        } else if (order[index].num < 10) {
          dispatch(addOrder(index));
        }
      }, [dispatch, order]);
    const subOnClick = useCallback(
      (index) => {
        if (order[index].num === "") {
          dispatch(subOrder(index));
        } else if (order[index].num > 1) {
          dispatch(subOrder(index));
        }
      }, [dispatch, order]);
    const onChange = useCallback(
      (e, index) => {
        const curValue = e.target.value;
        const newValue = curValue.replace(/[^0-9]/g, "");
    
        if (newValue === "") {
          dispatch(changeOrder({ index, num: newValue }));
        } else if (parseInt(newValue) > 0 && parseInt(newValue) < 11) {
          dispatch(changeOrder({ index, num: parseInt(newValue) }));
        }
      }, [dispatch]);

    return(
        <List className={classes.root}>
            {order.length>0&&order.map((value, index)=>(
                <li key={`order-item-${index}`}>
                  <OrderItem
                    value={value}
                    removeOnClick={removeOnClick}
                    addOnClick={addOnClick}
                    subOnClick={subOnClick}
                    onChange={onChange}
                    index={index}
                    length={order.length}
                    result={result}
                  />
                </li>
            ))}
        </List>
    );
}

export default React.memo(OrderList);