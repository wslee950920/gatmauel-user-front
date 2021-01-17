import React from 'react';
import {useSelector} from 'react-redux';

import Map from '../../components/map';

const MapCon=()=>{
    const { order}=useSelector(state=>(
        {
            order:state.order.order
        }
    ));

    return <Map order={order}/>
}

export default MapCon;