import React,{useRef} from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import RWView from "../../common/RWView";

const useStyles = makeStyles((theme) => ({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      padding: theme.spacing(0.5),
    },
    root: {
      marginBottom: theme.spacing(1),
    },
  }));

const Write=({
    content,
    handleClose,
    imgs,
    onChange,
    handleFileRemove,
    onCamera,
    handleFileOnChange,
    onSubmit,
    review
})=>{
    const classes = useStyles();
    const inputId=useRef('write-input-id');

    return(
        <>
            <div className={classes.root}>
                <CssBaseline />
                <Container maxWidth="sm">
                    <div className={classes.header}>
                        <Button onClick={handleClose} color="secondary">
                            취소
                        </Button>
                    </div>
                    <Divider />
                </Container>
            </div>
            <RWView 
                content={content} 
                imgs={imgs} 
                onChange={onChange} 
                handleFileRemove={handleFileRemove}
                onCamera={onCamera}
                inputId={inputId.current}
                handleFileOnChange={handleFileOnChange}
                onSubmit={onSubmit}
                review={review}
            />
        </>
    );
};

export default React.memo(Write);