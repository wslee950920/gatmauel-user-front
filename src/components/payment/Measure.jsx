import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from "@material-ui/core/styles";

const useStyles=makeStyles((theme)=>({
    root:{
        marginTop:theme.spacing(3)
    },
    col:{
        display:'flex',
        flexDirection:'row'
    },
    radio:{
        padding:theme.spacing(0.8)
    },
    text:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:60,
        height:30,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
}));

const Measure=({measure, onChange})=>{
    const classes=useStyles();

    return(
        <RadioGroup 
            className={classes.root}
            aria-label="select measure" 
            name="measure"
            value={measure}
            onChange={onChange}
        >
            <div className={classes.col}>
                <Radio className={classes.radio} value='kakao'/>
                <div className={classes.text}>
                    카카오페이
                </div>
            </div>
            <div className={classes.col}>
                <Radio className={classes.radio} value='card'/>
                <div className={classes.text}>
                    카드결제
                </div>
            </div>
            <div className={classes.col}>
                <Radio className={classes.radio} value='later'/>
                <div className={classes.text}>
                    만나서 결제
                </div>
            </div>
        </RadioGroup>
    );
}

export default React.memo(Measure);