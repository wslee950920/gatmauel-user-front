import React from 'react';
import {useSelector} from 'react-redux';

import Header from "../../components/header";

const HeaderCon=({main})=>{
    const {user}=useSelector(state=>(
        {
            user:state.user.user
        }
    ));

    return <Header main={main} user={user}/>
};

export default React.memo(HeaderCon);