import React, {useEffect, useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Order from '../../components/order';

import { getInfo, check } from "../../modules/user";

import { user as userAPI } from "../../lib/api/client";

const OrderCon=({history})=>{
    const { order, info, error, loading, temp }=useSelector(state=>(
        {
            order:state.order.order,
            info:state.user.info,
            error:state.user.error,
            loading:state.loading['user/GET_INFO'],
            temp:state.order.temp
        }
    ));
    const [distance, setDistance]=useState(null);
    const [value, setValue] = useState(0);
    const dispatch=useDispatch();

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
      }, []);
    const changeDistance=useCallback((d)=>{
        setDistance(d);
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

        const total = order.reduce(
          (prev, value) => prev + value.price * (value.num === "" ? 0 : value.num),
          0
        );
        if(total<14000){
          alert('14,000원 이상부터 주문하실 수 있습니다.');
          history.push('/menu');

          return;
        }
    }, [order, history]);
    useEffect(()=>{
        if(info) return;
        if(error) return;
        if(loading) return;

        dispatch(getInfo());
    }, [dispatch, info, error, loading]);
    useEffect(()=>{ 
        if(value===1){
            if(!distance){
                if(temp.address){
                  userAPI.get('/api/order/distance', {
                    params:{
                      goal:temp.address
                    }
                  }).then((res)=>{
                    setDistance(res.data.distance);
                  }).catch((err)=>{
                    if(err){
                      if(err.response.status===404){
                        alert('주소를 찾을 수 없습니다.');
                      } else{
                        alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
                      }
                    }
                  })
                }
                else if (info&&info.address) {
                  userAPI.get('/api/order/distance', {
                    params:{
                      goal:info.address
                    }
                  }).then((res)=>{
                    setDistance(res.data.distance);
                  }).catch((err)=>{
                    if(err){
                      if(err.response.status===404){
                        alert('주소를 찾을 수 없습니다.');
                      } else{
                        alert('오류가 발생했습니다. 잠시 후 다시 시도해주십시오.');
                      }
                    }
                  })
                }
            }
        }   
      }, [distance, info, temp, value]);

    return (
        <Order 
            order={order}  
            temp={temp} 
            distance={distance} 
            changeDistance={changeDistance}
            value={value}
            handleChange={handleChange}
        />
    );
}

export default withRouter(OrderCon);