import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Order from '../../components/order';

const OrderCon=({history})=>{
    const { order, info }=useSelector(state=>(
        {
            order:state.order.order,
            info:state.user.info
        }
    ));

    useEffect(()=>{
        if(order.length===0){
            alert('메뉴를 추가해주세요.');
            history.push('/menu');
        }
    }, [order, history]);

    return <Order order={order} info={info}/>;
}

export default withRouter(OrderCon);