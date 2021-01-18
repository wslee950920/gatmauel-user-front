import React, {useState} from 'react';
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import {makeStyles} from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
    cell:{
        fontFamily:'Roboto'
    },
    pRight:{
        paddingRight:theme.spacing(0)
    },
    icon:{
        marginRight:theme.spacing(1)
    },
    paper:{
        minWidth:250
    }
}));

const InfoDialog=({open, handleClose})=>{
    const classes=useStyles();
    const [coll, setColl]=useState([false, false]);

    return(
        <Dialog 
            onClose={handleClose} 
            aria-labelledby="Info-Dialog" 
            open={open}
        >
            <TableContainer component={Paper} className={classes.paper}>
                <Table aria-label="Tip info table">
                    <TableHead>
                        <TableRow >
                            <TableCell component="th" scope="row" >
                                <IconButton 
                                    className={classes.icon} 
                                    aria-label="expand row" 
                                    size="small" 
                                    onClick={()=>{
                                        setColl(prev=>{
                                            const next=prev;
                                            next[0]=!prev[0];

                                            return [...next];
                                        })
                                    }}
                                >
                                    {coll[0] ? <KeyboardArrowUpIcon />:<KeyboardArrowDownIcon />}
                                </IconButton>
                                기본 배달료
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell padding='none'>
                        <Collapse in={coll[0]} timeout="auto" unmountOnExit>
                            <Table>
                                <TableBody>
                                <TableRow >
                                    <TableCell 
                                        component="th" 
                                        scope="row" 
                                        className={
                                            clsx(classes.cell, classes.pRight)
                                        }
                                    >
                                        40,000원 이상
                                    </TableCell>
                                    <TableCell 
                                        align="right" 
                                        className={classes.cell}
                                    >
                                        0원
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell 
                                        component="th" 
                                        scope="row" 
                                        className={
                                            clsx(classes.cell, classes.pRight)
                                        }
                                    >
                                        27,000원~40,000원 미만
                                    </TableCell>
                                    <TableCell 
                                        align="right" 
                                        className={classes.cell}
                                    >
                                        500원
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell 
                                        component="th" 
                                        scope="row" 
                                        className={
                                            clsx(classes.cell, classes.pRight)
                                        }
                                    >
                                        14,000원~27,000원 미만
                                    </TableCell>
                                    <TableCell 
                                        align="right" 
                                        className={classes.cell}
                                    >
                                        1,000원
                                    </TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                        </Collapse>
                        </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table aria-label="Tip info table">
                    <TableHead>
                        <TableRow >
                            <TableCell component="th" scope="row" >
                                <IconButton 
                                    className={classes.icon} 
                                    aria-label="expand row" 
                                    size="small" 
                                    onClick={()=>{
                                        setColl(prev=>{
                                            const next=prev;
                                            next[1]=!prev[1];

                                            return [...next];
                                        })
                                    }}
                                >
                                    {coll[1] ? <KeyboardArrowUpIcon />:<KeyboardArrowDownIcon />}
                                </IconButton>
                                    지역별 추가 배달료
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell padding='none'>
                        <Collapse in={coll[1]} timeout="auto" unmountOnExit>
                            <Table>
                                <TableBody>
                                <TableRow >
                                    <TableCell 
                                        component="th" 
                                        scope="row" 
                                        className={
                                            clsx(classes.cell, classes.pRight)
                                        }
                                    >
                                        입북동
                                    </TableCell>
                                    <TableCell 
                                        align="right" 
                                        className={classes.cell}
                                    >
                                        +2,000원
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell 
                                        component="th" 
                                        scope="row" 
                                        className={
                                            clsx(classes.cell, classes.pRight)
                                        }
                                    >
                                        반월동
                                    </TableCell>
                                    <TableCell 
                                        align="right" 
                                        className={classes.cell}
                                    >
                                        +2,500원
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell 
                                        component="th" 
                                        scope="row" 
                                        className={
                                            clsx(classes.cell, classes.pRight)
                                        }
                                    >
                                        금곡동, 호매실동
                                    </TableCell>
                                    <TableCell 
                                        align="right" 
                                        className={classes.cell}
                                    >
                                        +3,000원
                                    </TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                        </Collapse>
                        </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Dialog>
    )
}

export default React.memo(InfoDialog)