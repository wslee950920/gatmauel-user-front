import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Order from '../../components/order';

import { getInfo } from "../../modules/user";

const OrderCon=({history})=>{
    const { order, info, error, loading }=useSelector(state=>(
        {
            order:state.order.order,
            info:state.user.info,
            error:state.user.error,
            loading:state.loading['user/GET_INFO']
        }
    ));
    const dispatch=useDispatch();

    useEffect(()=>{
        if(order.length===0){
            alert('메뉴를 추가해주세요.');
            history.push('/menu');
        }
    }, [order, history]);
    useEffect(()=>{
        if(info) return;
        if(error) return;
        if(loading) return;

        dispatch(getInfo());
    }, [dispatch, info, error, loading]);

    return <Order order={order} info={info}/>;
}

export default withRouter(OrderCon);