import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Result from '../../components/result'; 
import useGetTotal from '../../lib/useGetTotal';

import {initOrder} from '../../modules/order';

const ResultCon=({history})=>{
    const { order, finish }=useSelector(state=>(
        {
            order:state.order.order,
            finish:state.order.finish
        }
    ));
    const dispatch=useDispatch();
    const getTotal=useGetTotal(order);

    useEffect(()=>{
        if(order.length===0||!finish){
            history.push('/');
        }
    }, [order, finish, history]);
    useEffect(()=>{
        return()=>{
            dispatch(initOrder());
        }
    }, [dispatch]);

    return finish?(
        <Result 
            order={order}
            getTotal={getTotal}
            result={finish}
        />
    ):null
}

export default withRouter(ResultCon);