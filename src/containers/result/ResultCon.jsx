import React, {useState, useEffect, useMemo} from 'react';

import {withRouter} from 'react-router-dom';
import querystring from 'querystring';
import { useDispatch } from "react-redux";

import Result from '../../components/result'; 

import { initOrder } from "../../modules/order";
import { user as userAPI } from "../../lib/api/client";

const ResultCon=({history, location})=>{
    const [details, setDetails]=useState(null);
    const [order, setOrder]=useState(null);
    const dispatch=useDispatch();

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

        userAPI.get(`api/order/result/${query.orderId}`)
            .then(({data})=>{
                setOrder(data.order);
                setDetails(data.details.map((value)=>{
                    return {
                        num:value.num,
                        ...value.food
                    }
                }));
            })
            .catch(()=>{
                alert('데이터가 없습니다.');
                history.push('/');
            })
    }, [location, history]);
    useEffect(()=>{
        return()=>{
            dispatch(initOrder());
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