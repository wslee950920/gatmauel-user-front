import React from 'react';

import { makeStyles } from "@material-ui/core/styles";

import useInsertComma from '../../../lib/useInsertComma';

const useStyles = makeStyles((theme) => ({
    total: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: theme.spacing(2, 1.5, 0),
    },
    sizeOne: {
      fontSize: "1rem",
    },
    small: {
      fontSize: "0.7rem",
    },
  }));

const Money=({getTotal, charge, measure})=>{
    const classes=useStyles();
    const insertComma=useInsertComma;

    return(
        <>
            <div className={classes.total}>
              <div className={classes.small}>음식값 : </div>
              <div className={classes.small}>{insertComma(getTotal)}</div>
            </div>
            <div className={classes.total}>
              <div className={classes.small}>배달료 : </div>
              <div className={classes.small}>{insertComma(charge)}</div>
            </div>
            {measure&&(
              <div className={classes.total}>
                <div className={classes.sizeOne}>결제방법 : </div>
                <div className={classes.sizeOne}>
                  {measure}
                </div>
            </div>
            )}
            <div className={classes.total}>
              <div className={classes.sizeOne}>총액 : </div>
              <div className={classes.sizeOne}>
                {insertComma(getTotal + charge)}
              </div>
            </div>
        </>
    )
}

export default React.memo(Money);