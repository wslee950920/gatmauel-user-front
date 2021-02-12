import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Result from '../../components/order/Result'; 

import {initOrder} from '../../modules/order';

const ResultCon=({history})=>{
    const { order, result }=useSelector(state=>(
        {
            order:state.order.order,
            result:state.order.result
        }
    ));
    const dispatch=useDispatch();

    useEffect(()=>{
        if(!order||!result){
            history.push('/');
        }
    }, [order, result, history]);
    useEffect(()=>{
        return()=>{
            dispatch(initOrder());
        }
    }, [dispatch]);

    return (
        <Result 
            order={order}  
        />
    );
}

export default withRouter(ResultCon);