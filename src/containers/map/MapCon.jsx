import React from 'react';
import {useSelector} from 'react-redux';
import { RenderAfterNavermapsLoaded } from "react-naver-maps";

import Map from '../../components/map';
import Circular from "../../components/common/Circular";

const MapCon=()=>{
    const { order }=useSelector(state=>(
        {
            order:state.order.order
        }
    ));

    return (
        <RenderAfterNavermapsLoaded
            ncpClientId={process.env.REACT_APP_NAVER_MAP_CLIENT}
            error={<p>Maps Load Error</p>}
            loading={
                <Circular
                    container={{
                        height: "60vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                />
            }
        >
            <Map order={order}/>
        </RenderAfterNavermapsLoaded>
    );
}

export default MapCon;