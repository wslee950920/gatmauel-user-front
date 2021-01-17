import React from 'react';
import {useSelector} from 'react-redux';

import Order from '../../components/order';

const OrderCon=()=>{
    const { order}=useSelector(state=>(
        {
            order:state.order.order
        }
    ));

    return <Order order={order}/>;
}

export default OrderCon;