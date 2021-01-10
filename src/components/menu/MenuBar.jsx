import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    
  },
  background: {
    padding: theme.spacing(1),
    position: "fixed",
    zIndex: theme.zIndex.appBar,
    width:'100%'
  },
  offset:theme.mixins.toolbar,
  fakeBar:{
      backgroundColor:'white'
  }
}));

const MenuBar=({categories, handleClick, value})=> {
  const classes = useStyles();

  return (
    <>
      <div className={classes.background}>
        <CssBaseline />
        <Container maxWidth="md" className={classes.root} disableGutters>
           <AppBar position="static" color="default">
              <Tabs
                value={value}    
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs"
              >
                {categories.map((category, index)=>(
                  <Tab 
                    label={category.category} 
                    {...a11yProps(index)} 
                    key={category.category+'_bar'} 
                    onClick={()=>handleClick(index)}
                  />
                ))}
              </Tabs>
            </AppBar>
          </Container>
      </div>
      <div className={`${classes.offset} ${classes.fakeBar}`} />
    </>
  );
}

export default React.memo(MenuBar);
