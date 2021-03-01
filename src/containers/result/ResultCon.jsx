import React, {useState, useEffect, useMemo, useRef} from 'react';

import querystring from 'querystring';
import { useDispatch } from "react-redux";
import {withRouter} from 'react-router-dom';

import Result from '../../components/result'; 

import { initOrder } from "../../modules/order";
import { user as userAPI } from "../../lib/api/client";

const ResultCon=({history, location})=>{
    const [details, setDetails]=useState(null);
    const [order, setOrder]=useState(null);
    const dispatch=useDispatch();
    const deleted=useRef(true);

    const getTotal = useMemo(() => {
        if(details){
            return details.reduce(
                (prev, value) => prev + value.price * (value.num === "" ? 0 : value.num),
                0
            );
        } else{
            return 0;
        }
      }, [details]);

    useEffect(()=>{
        const query=querystring.parse(location.search.split('?')[1]);
        if(!query.orderId){
            history.push('/');

            return;
        }

        userAPI.get(`/order/result/${query.orderId}`)
            .then(({data})=>{
                setOrder(data.order);
                setDetails(data.details.map((value)=>{
                    return {
                        num:value.num,
                        ...value.food
                    }
                }));
            })
            .catch((error)=>{
                if(error.response){
                    deleted.current=false;

                    if(error.response.status===400){
                        alert('데이터가 없습니다.');
                        history.push('/');
                    } else if(error.response.status===410){
                        alert('결제가 취소되었습니다.');
                        history.push('/order');
                    } else {
                        alert('결제를 실패하였습니다. 잠시 후 다시 시도해주십시오.');
                        history.push(`/payment/${error.response.message}`);
                    }

                    return;
                }

                alert('오류가 발생하였습니다. 관리자에게 문의해주세요.');
                history.push('/');
            })
    }, [location, history]);
    useEffect(()=>{
        return ()=>{
            if(deleted.current){
                dispatch(initOrder());
            }
        }
    }, [dispatch]);

    return order&&details?(
        <Result 
            details={details}
            getTotal={getTotal}
            order={order}
        />
    ):null
}

export default withRouter(ResultCon);