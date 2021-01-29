import React from 'react';

import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    fontMaple: {
      fontFamily: "MaplestoryOTFBold",
      color:'black'
    }
  }));

const AddrInput=({
    handleMouseDown, 
    clearAddress, 
    handleClickOpen, 
    addr, 
    error, 
    addrRef,
    detail,
    detailChange,
    detailRef,
    value,
    dense
})=>{
    const classes=useStyles();
    
    return(
        <>
            <FormControl
                variant="outlined"
                size="small"
                fullWidth
                margin={dense?'dense':"normal"}
                focused={false}
            >
                <InputLabel 
                    htmlFor="outlined-adornment-address" 
                    error={error.addr}
                >
                    시/군/구
                </InputLabel>
                <OutlinedInput
                    autoComplete="off"
                    fullWidth
                    name="address"
                    id="outlined-adornment-address"
                    label="시/군/구"
                    {...(value === 0 && {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="clear address"
                              edge="end"
                              onMouseDown={handleMouseDown}
                              onClick={clearAddress}
                            >
                              <ClearIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                    })}
                    inputRef={addrRef}
                    inputProps={{
                        className: classes.fontMaple,
                        onClick: handleClickOpen,
                    }}
                    value={addr}
                    error={error.addr}
                    disabled={value === 1}
                />
            </FormControl>
            <TextField
                variant="outlined"
                margin={dense?'dense':"normal"}
                fullWidth
                name="detail"
                label="상세주소"
                size="small"
                inputProps={{ 
                    className: classes.fontMaple,
                }}
                value={detail}
                onChange={detailChange}
                error={error.detail}
                inputRef={detailRef}
                disabled={value === 1}
                {...(value===1&&{
                    InputLabelProps:{ style: { color: "rgba(0, 0, 0, 0.54)" } }
                })}
            />
        </>
    )
}

export default React.memo(AddrInput);