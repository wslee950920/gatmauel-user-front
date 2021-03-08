import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from "@material-ui/core/styles";

const useStyles=makeStyles((theme)=>({
    root:{
        marginTop:theme.spacing(3)
    },
    radio:{
        padding:theme.spacing(0.8)
    },
    label:{
        fontSize:'0.8rem',
    },
    fcl:{
        margin:0
    },
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
            <FormControlLabel 
                value='kakao' 
                control={<Radio className={classes.radio}/>} 
                label="카카오페이" 
                classes={{label:classes.label}}
                className={classes.fcl}
            />
            <FormControlLabel 
                value='card'
                control={<Radio className={classes.radio}/>} 
                label="카드결제" 
                classes={{label:classes.label}}
                className={classes.fcl}
            />
            <FormControlLabel 
                value='later'
                control={<Radio className={classes.radio}/>} 
                label="나중에결제" 
                classes={{label:classes.label}}
                className={classes.fcl}
            />
        </RadioGroup>
    );
}

export default React.memo(Measure);