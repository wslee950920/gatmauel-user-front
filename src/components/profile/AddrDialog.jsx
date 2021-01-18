import React from 'react';

import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddrDialog=({handleClose, open})=>{
    const classes=useStyles();

    return(
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <>
                <div className={classes.root}>
                <CssBaseline />
                <Container maxWidth="sm">
                    <div className={classes.header}>
                        <Button 
                            onClick={handleClose} 
                            color="secondary" 
                        >
                            취소
                        </Button>
                    </div>
                    <Divider />
                </Container>
                </div>
            </>
        </Dialog>
    );
};

export default React.memo(AddrDialog);