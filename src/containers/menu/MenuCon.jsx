import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {usePreloader} from '../../lib/PreloadContext';

import {getCategory} from '../../modules/food';

import Menu from '../../components/menu';
import Circular from '../../components/common/Circular';

const MenuCon=()=>{
    const {category, loading, error, order}=useSelector(state=>({
        category:state.food.category,
        error:state.food.error,
        loading:state.loading['get/CATEGORY'],
        order:state.order.order
    }));
    const dispatch=useDispatch();

    usePreloader(()=>dispatch(getCategory()));

    useEffect(()=>{
        if(category) return;
        if(loading) return;
        if(error) return;

        dispatch(getCategory());
    }, [dispatch, category, loading, error]);

    return(
        category?
            <Menu categories={category} order={order}/>:
            <Circular 
                container={{
                    height: '100vh',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
              }}
            />
    );
}

export default MenuCon;
