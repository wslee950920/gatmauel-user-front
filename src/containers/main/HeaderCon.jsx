import React from 'react';
import {useSelector} from 'react-redux';

import Header from "../../components/header";

const HeaderCon=()=>{
    const {user}=useSelector(state=>(
        {
            user:state.user.user
        }
    ));

    return <Header user={user}/>
};

export default HeaderCon;