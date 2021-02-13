import React, {useEffect, useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Order from '../../components/order';

import { getInfo, check } from "../../modules/user";
import useGetTotal from "../../lib/useGetTotal";

const OrderCon=({history})=>{
    const { order, info, error, loading }=useSelector(state=>(
        {
            order:state.order.order,
            info:state.user.info,
            error:state.user.error,
            loading:state.loading['user/GET_INFO'],
        }
    ));
    const [value, setValue] = useState(0);
    const dispatch=useDispatch();
    const getTotal = useGetTotal(order);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
      }, []);
    
    useEffect(()=>{
        dispatch(check());
    }, [dispatch]);
    useEffect(()=>{
        if(order.length===0){
            alert('메뉴를 추가해주세요.');
            history.push('/menu');

            return;
        }

        if(getTotal<14000){
          alert('14,000원 이상부터 주문하실 수 있습니다.');
          history.push('/menu');

          return;
        }
    }, [order, history, getTotal]);
    useEffect(()=>{
        if(info) return;
        if(error) return;
        if(loading) return;

        dispatch(getInfo());
    }, [dispatch, info, error, loading]);

    return (
        <Order 
            order={order}  
            value={value}
            handleChange={handleChange}
            getTotal={getTotal}
        />
    );
}

export default withRouter(OrderCon);