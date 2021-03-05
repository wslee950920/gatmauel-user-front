import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import EditReview from '../EditReview';

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
    loading,
    progress,
    review,
    rOnly,
})=>{
    const classes = useStyles();

    return(
        <>
            <div className={classes.root}>
                <CssBaseline />
                <Container maxWidth="sm">
                    <div className={classes.header}>
                        <Button 
                            onClick={handleClose} 
                            color="secondary" 
                            disabled={loading}
                        >
                            취소
                        </Button>
                    </div>
                    <Divider />
                </Container>
            </div>
            <EditReview 
                content={content} 
                imgs={imgs} 
                onChange={onChange} 
                handleFileRemove={handleFileRemove}
                onCamera={onCamera}
                handleFileOnChange={handleFileOnChange}
                onSubmit={onSubmit}
                loading={loading}
                progress={progress}
                review={review}
                rOnly={rOnly}
            />
        </>
    );
};

export default React.memo(Write);