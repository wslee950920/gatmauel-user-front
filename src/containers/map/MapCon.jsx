import React, {useEffect} from 'react';
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

    useEffect(()=>{
        if (window.Kakao) {
          const kakao = window.Kakao
          // 중복 initialization 방지
          if (!kakao.isInitialized()) {
            kakao.init(process.env.REACT_APP_KAKAO_JS_KEY)
          }
        }
    }, []);

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