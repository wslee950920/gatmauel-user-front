import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
      fontFamily:'Roboto',
    },
    btn: {
      fontFamily:'Roboto',
      marginTop:theme.spacing(0.5)
    },
    label:{
      color:theme.palette.grey[800],
      textDecoration:'underline'
    },
    panel:{
      flex:1,
    },
}));

const SelectPanel=({ children, value, index, handleOpen })=>{
    const classes=useStyles();

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        className={classes.panel}
      >
        {value === index && (
          <Box p={1}>
            <Typography classes={{root:classes.root}}>
                {children}
            </Typography>
            {index===1&&(
              <Button
                className={classes.btn}
                color="primary"
                size='small'
                classes={{label:classes.label}}
                onClick={handleOpen}
              >
                배달팁 안내
              </Button>
            )}
          </Box>
        )}
      </div>
    );
  }
  
  SelectPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  export default React.memo(SelectPanel);
