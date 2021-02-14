import React from 'react';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from "@material-ui/core/styles";

const useStyles=makeStyles((theme)=>({
    textarea:{
        width:'100%',
        padding:theme.spacing(1),
        borderColor:'rgba(0, 0, 0, 0.23)',
        borderRadius:theme.spacing(0.5)
    },
    label:{
        fontSize:'0.8rem',
    },
    fcl:{
        margin:0
    },
    radio:{
        padding:theme.spacing(0.8)
    }
}));

const RequestText=({radio, text, onChange})=>{
    const classes=useStyles();

    return(
        <>
            <RadioGroup 
                row 
                aria-label="five minutes" 
                name="five" 
                value={radio} 
                onChange={onChange}
                defaultValue='5분이내 거리(조리)'
            >
                <FormControlLabel 
                    value='5분이내 거리(조리)' 
                    control={<Radio className={classes.radio}/>} 
                    label="5분이내 거리(조리)" 
                    classes={{label:classes.label}}
                    className={classes.fcl}
                />
                <FormControlLabel 
                    value='5분이상 거리(생면)' 
                    control={<Radio className={classes.radio}/>} 
                    label="5분이상 거리(생면)" 
                    classes={{label:classes.label}}
                    className={classes.fcl}
                />
            </RadioGroup>
            <TextareaAutosize
                className={classes.textarea} 
                aria-label="request text area" 
                rowsMin={3} 
                rowsMax={3}
                placeholder="ex)견과류 빼주세요. 덜 맵게 해주세요." 
                value={text}
                onChange={onChange}
                name='text'
            />
        </>
    );    
}

export default React.memo(RequestText);

