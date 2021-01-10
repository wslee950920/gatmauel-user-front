import React, {useCallback} from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { MDBView } from "mdbreact";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

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

const MenuList =({handleOpen, categories, listRefs, setValue, setLoading})=> {
  const classes = useStyles();
  const theme=useTheme();

  const onLoad=useCallback(()=>{
    setLoading(false);
  }, [setLoading]);

  return (
    <div className={classes.background}>
      <CssBaseline />
      <Container maxWidth='lg' disableGutters >
      {categories.map((category, cIndex)=>(
        <div 
          className={classes.root} 
          key={category.category+'_list'} 
          ref={listRefs.current[cIndex]}
        >
          <GridList cellHeight={'100vw'/3} cols={3}>
            <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
              <ListSubheader component="div">
                {category.category}
              </ListSubheader>
            </GridListTile>
            {category.food.map((tile, fIndex) => (
              <GridListTile 
                key={tile.name} 
                style={{
                  padding:theme.spacing(0.1), 
                  height:'auto'
                }}
              >
                <MDBView hover zoom>
                  <img 
                    src={process.env.REACT_APP_CF_DOMAIN_NAME+tile.img} 
                    alt={tile.name} 
                    onClick={()=>{
                      handleOpen(fIndex);
                      setValue(cIndex);
                    }}
                    className="img-fluid"
                    style={{
                      cursor: "pointer",
                    }}
                    onLoad={onLoad}
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
