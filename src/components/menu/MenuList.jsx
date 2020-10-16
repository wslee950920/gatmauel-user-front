import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { MDBView } from "mdbreact";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import tileData from "./TileData";

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
  }
}));

const MenuList =({handleOpen, categories, forwardedRef, value})=> {
  const classes = useStyles();
  const theme=useTheme();

  return (
    <div className={classes.background}>
      <CssBaseline />
      <Container maxWidth='lg' disableGutters >
      {categories.map((category, index)=>(
        <div 
          className={classes.root} 
          key={category} 
          ref={index===value?forwardedRef:null}
        >
          <GridList cellHeight={window.innerWidth/3} cols={3}>
            <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
              <ListSubheader component="div">
                {category}
              </ListSubheader>
            </GridListTile>
            {tileData.map((tile) => (
              <GridListTile 
                key={tile.name} 
                style={{
                  padding:theme.spacing(0.1), 
                  height:'auto'
                }}
              >
                <MDBView hover zoom>
                  <img 
                    src={tile.img} 
                    alt={tile.name} 
                    onClick={handleOpen}
                    className="img-fluid"
                    style={{
                      cursor: "pointer",
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
