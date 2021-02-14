import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Result from '../../components/result'; 
import useGetTotal from '../../lib/useGetTotal';

import {initOrder} from '../../modules/order';

const ResultCon=({history})=>{
    const { order, result }=useSelector(state=>(
        {
            order:state.order.order,
            result:state.order.result
        }
    ));
    const dispatch=useDispatch();
    const getTotal=useGetTotal(order);

    useEffect(()=>{
        if(order.length===0||!result){
            history.push('/');
        }
    }, [order, result, history]);
    useEffect(()=>{
        return()=>{
            dispatch(initOrder());
        }
    }, [dispatch]);

    return (result&&
        <Result 
            order={order}
            getTotal={getTotal}
            result={result.data.newOrder}
        />
    );
}

export default withRouter(ResultCon);