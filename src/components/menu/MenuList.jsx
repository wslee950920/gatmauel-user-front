import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { MDBView } from "mdbreact";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Circular from '../common/Circular';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  title:{
      fontSize:'0.8rem'
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  background:{
    backgroundColor:'white'
  },
  tile:{
    padding:theme.spacing(0.1), 
    height:'auto',
    cursor:'pointer'
  }
}));

const MenuList =({handleOpen, categories, listRefs, setValue, loadings, onLoad})=> {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <CssBaseline />
      <Container maxWidth='lg' disableGutters >
      {categories.map((category, cIndex)=>(
        <div 
          className={classes.root} 
          key={category.category+'_list'} 
        >
          <GridList cellHeight='auto' cols={3} style={{width:'100%'}}>
            <GridListTile 
              key="Subheader" 
              cols={3} 
              style={{ height: 'auto' }}
              ref={listRefs.current[cIndex]}
            >
              <ListSubheader component="div">
                {category.category}
              </ListSubheader>
            </GridListTile>
            {category.food.map((tile, fIndex) => (
              <GridListTile 
                key={tile.name} 
                className={classes.tile}
                onClick={()=>{
                  handleOpen(fIndex);
                  setValue(cIndex);
                }}
              >
                {loadings[cIndex][fIndex]&&(
                  <Circular
                    container={{
                      width: "100%",
                      paddingTop: "100%",
                      position: "relative",
                    }}
                    inside={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      margin: "auto",
                    }}
                  />
                )}
                <MDBView hover zoom>
                  <img 
                    src={process.env.REACT_APP_CF_DOMAIN_NAME+tile.img} 
                    alt={tile.name} 
                    className={clsx(loadings[cIndex][fIndex]?'d-none':"img-fluid")}
                    style={{
                      cursor: "pointer",
                    }}
                    onLoad={()=>{
                      onLoad(cIndex, fIndex);
                    }}
                  />
                </MDBView>  
                <GridListTileBar
                  title={tile.name}
                  classes={{title:classes.title, root:classes.titleBar}}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      ))}  
      </Container>
    </div>
  );
}

export default React.memo(MenuList);
