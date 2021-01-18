import React from 'react';
import {useSelector} from 'react-redux';

import Order from '../../components/order';

const OrderCon=()=>{
    const { order, info }=useSelector(state=>(
        {
            order:state.order.order,
            info:state.user.info
        }
    ));

    return <Order order={order} info={info}/>;
}

export default OrderCon;