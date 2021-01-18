import React, {useCallback} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SelectPanel from './SelectPanel';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      borderRadius: "8px",
      padding:theme.spacing(1, 0)
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const SelectTab=({value, handleChange, handleOpen })=>{
    const classes=useStyles();

    const a11yProps=useCallback((index)=>{
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        };
    }, [])

    return(
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                className={classes.tabs}
                indicatorColor='primary'
            >
                <Tab label="포장" {...a11yProps(0)} />
                <Tab label="배달" {...a11yProps(1)} />
            </Tabs>
            <SelectPanel value={value} index={0} className={classes.panel}>
                매장에서 바로 픽업하실 수 있도록 준비해드립니다.
            </SelectPanel>
            <SelectPanel 
                value={value} 
                index={1}  
                handleOpen={handleOpen}
            >
                문 앞까지 음식을 배달 해드립니다.<br/>
            </SelectPanel>
        </div>
    )
}

export default React.memo(SelectTab);