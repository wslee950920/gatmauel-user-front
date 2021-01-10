import React from 'react';

import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles=makeStyles((theme)=>({
    title:{
        color:theme.palette.grey[600],
        fontFamily:'Roboto',
        marginBottom:theme.spacing(0.5),
        fontWeight:'bold'
    },
    content:{
        color:theme.palette.grey[500],
        fontFamily:'Roboto'
    }
}))

const MenuFooter=()=>{
    const theme=useTheme();
    const md=useMediaQuery(theme.breakpoints.up('md'));
    const sm=useMediaQuery(theme.breakpoints.up('sm'));
    const xs=useMediaQuery(theme.breakpoints.up('xs'));
    const classes=useStyles();

    return(
        <Box py={2} px={1} pb={md?70:sm?88:xs?50:48}>
            <Typography variant="subtitle2" className={classes.title} >
                원산지 표기
            </Typography>
            <Typography variant='caption' className={classes.content} paragraph>
                칼국수,전복칼국수-밀가루(호주산)바지락(국내산)전복(국내산)/ 
                비빔국수-양념(고추가루:국내산50% 중국산50%)채소(국내산)/ 
                콩국수-콩(국내산)/ 
                왕만두,쭈꾸미만두(국내산)/
                꼬막무침,전복무침,꼬막비빔국수-꼬막(국내산)채소(국내산)밀가루(호주산)/ 
                보쌈,전복보쌈-돼지고기(칠레산)보쌈김치(국내산)/
                전복찜-전복(국내산)
            </Typography>
            <Typography variant="subtitle2" className={classes.title} >
                유의사항
            </Typography>
            <Typography variant='caption' className={classes.content}>
                * 메뉴 사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있습니다.
            </Typography>
        </Box>
    )
};

export default MenuFooter;