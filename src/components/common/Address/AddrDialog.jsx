import React, {useMemo, useCallback} from 'react';
import List from "react-virtualized/dist/commonjs/List";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import SearchBar from '../SearchBar';
import Circular from '../Circular';
import AddrBtn from './AddrBtn';

const useStyles = makeStyles((theme) => ({
    header: {
      padding: theme.spacing(0.5),
      position:'relative',
      display:'flex'
    },
    text:{
        fontSize:'1rem',
        paddingTop:theme.spacing(0.8),
        position:'absolute',
        left:'50%',
        transform: 'translateX(-50%)'
    }
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddrDialog=({
    addrOnClick, 
    query, 
    handleClose, 
    open, 
    kakao, 
    loadNextPage, 
    loading, 
    hasNextPage, 
    queryOnChange,
    handleOnExit
})=>{
    const classes=useStyles();

    const loadMoreRows = useMemo(
        () =>
          loading
            ? () => {
                console.log("already loading...");
              }
            : loadNextPage,
        [loading, loadNextPage]
      );
    const rowCount = useMemo(
        () => (hasNextPage ? kakao.length + 1 : kakao.length),
        [hasNextPage, kakao]
    );

    const isRowLoaded = useCallback(
        ({ index }) => !hasNextPage || index < kakao.length,
        [hasNextPage, kakao]
    );
    const rowRenderer = useCallback(
        ({ index, style, key }) => {
          return isRowLoaded({ index }) ? (
            <AddrBtn 
                index={index} 
                style={style} 
                key={key} 
                data={kakao[index]}
                addrOnClick={addrOnClick}
            />
          ) : (
            <div style={style} key={key}>
              <CssBaseline />
              <Circular
                container={{
                  height: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </div>
          );
        },
        [isRowLoaded, kakao, addrOnClick]
    );

    return(
        <Dialog 
            fullScreen 
            open={open} 
            onClose={handleClose} 
            TransitionComponent={Transition} 
            onExited={handleOnExit}
        >
            <CssBaseline />
            <Container maxWidth="sm">
                <div className={classes.header}>
                    <IconButton 
                        onClick={handleClose}
                        edge='start'
                        size='small'
                    >
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <div className={classes.text}>
                        배달 받는 주소
                    </div>
                </div>
            </Container>
            <SearchBar address onChange={queryOnChange} value={query}/>
            <InfiniteLoader
                rowCount={rowCount}
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                threshold={1}
            >
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                width={width}
                                height={height-94}
                                rowCount={rowCount}
                                rowHeight={100}
                                ref={registerChild}
                                onRowsRendered={onRowsRendered}
                                rowRenderer={rowRenderer}
                                overscanRowCount={6}
                            />
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        </Dialog>
    );
};

export default React.memo(AddrDialog);