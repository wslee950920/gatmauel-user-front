import React, {useCallback} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";

const useStyles=makeStyles((theme)=>({
    textField: {
        width: "1.5rem",
    },
    bottom:{
        height:'3rem',
        display:'flex',
        justifyContent:'flex-end'
    },
    bottomRoot:{
        paddingTop:theme.spacing(0),
        paddingBottom:theme.spacing(0)
    },
    topRoot:{
        paddingBottom:theme.spacing(0)
    },
}))

const OrderItem=({
    value,
    removeOnClick,
    addOnClick,
    subOnClick,
    onChange,
    index,
    length
})=>{
    const classes=useStyles();

    const insertComma = useCallback((num) => {
        const result = String(num).split("");
        result.push("원");
        result.splice(-4, 0, ",");
    
        return result.join("");
    }, []);
    const checkRange = useCallback((n) => {
        if (n > 10 || n < 1) return true;
        else return false;
    }, []);

    return(
      <>
        <ListItem 
            alignItems='flex-start' 
            component='div'
            classes={{root:classes.topRoot}}
            disableGutters
        >
            <ListItemAvatar>
                <Avatar 
                    alt={value.name} 
                    src={process.env.REACT_APP_CF_DOMAIN_NAME+value.img} 
                    variant='square'
                />
            </ListItemAvatar>
            <ListItemText
                primary={value.name}
                secondary={insertComma(value.price)}
            />    
        </ListItem>
        <ListItem 
            component='div' 
            divider={index!==length-1} 
            className={classes.bottom}
            classes={{root:classes.bottomRoot}}
            disableGutters
        >
            <IconButton aria-label="sub" onClick={() => subOnClick(index)}>
                <RemoveIcon fontSize="small" />
            </IconButton>
            <TextField
                size="small"
                className={classes.textField}
                inputProps={{
                    maxLength: 2,
                    style: { 
                        textAlign: "center", 
                        fontFamily: "Roboto" 
                    },
                }}
                value={value.num}
                error={checkRange(value.num)}
                onChange={(e) => onChange(e, index)}
            />
            <IconButton aria-label="add" onClick={() => addOnClick(index)}>
                <AddIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="close" onClick={() => removeOnClick(index)}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </ListItem>
      </>
    );
}

export default React.memo(OrderItem);