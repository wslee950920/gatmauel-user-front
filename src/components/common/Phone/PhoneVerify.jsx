import React from 'react';
import clsx from 'clsx';

import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import PhoneFormatter from './PhoneFormatter';

const useStyles = makeStyles((theme) => ({
    input: {
      fontFamily: "MaplestoryOTFBold",
      backgroundColor:'white',
      color:'black'
    },
    fontRobo: {
      fontFamily: "Roboto",
    },
    field: {
      width: "100%",
      display: "flex",
    },
    button: {
      height: "2.5rem",
      margin: theme.spacing(2, 1, 1),
      color: "white",
      fontFamily: "Roboto",
      backgroundColor: theme.palette.primary.light,
    },
    verify: {
      height: "2.5rem",
      margin: theme.spacing(1, 1, 0.5),
      color: "white",
      fontFamily: "Roboto",
      backgroundColor: theme.palette.primary.light,
    },
    value: {
      height: "2.5rem",
      margin: theme.spacing(1, 1, 1),
      color: "white",
      fontFamily: "Roboto",
      backgroundColor: theme.palette.primary.light,
    },
  }));

const PhoneVerify=({
    phone, 
    phoneChange, 
    checkPhone, 
    verify, 
    error, 
    timer, 
    code, 
    codeOnChange, 
    confirmPhone,
    value
})=>{
    const classes=useStyles();
    
    return(
        <>
            <div className={classes.field}>
              <TextField
                variant="outlined"
                margin={value===0?'dense':"normal"}
                fullWidth
                name="phone"
                {...(value!==0&&{
                  label:'전화번호'
                })}
                size="small"
                InputProps={{
                  className: classes.input,
                  inputComponent: PhoneFormatter,
                }}
                type="tel"
                value={phone}
                onChange={phoneChange}
                error={error.phone}
              />
              <Button
                variant="contained"
                color="primary"
                className={clsx(value===0?classes.value:classes.button)}
                {...(!!phone && {
                  onClick: checkPhone,
                })}
                {...(verify && {
                  style: { fontSize: "0.65rem" },
                })}
              >
                {!verify ? "인증" : "재전송"}
              </Button>
            </div>
            {verify && (
              <div className={classes.field}>
                <FormControl
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="dense"
                  error={!!error.code}
                >
                  <InputLabel htmlFor="outlined-adornment-code">
                    인증번호
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    name="code"
                    id="outlined-adornment-code"
                    label="인증번호"
                    endAdornment={
                      <InputAdornment position="end">
                        <Typography
                          variant="body2"
                          className={classes.fontRobo}
                          color="error"
                        >
                          {timer}
                        </Typography>
                      </InputAdornment>
                    }
                    inputProps={{
                      className: classes.input,
                    }}
                    onChange={codeOnChange}
                    value={code}
                  />
                  {!!error.code && (
                    <FormHelperText id="outlined-adornment-code-error">
                      {error.code}
                    </FormHelperText>
                  )}
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.verify}
                  onClick={confirmPhone}
                >
                  확인
                </Button>
              </div>
            )}
        </>
    )
}

export default React.memo(PhoneVerify);