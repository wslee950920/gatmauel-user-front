import React from 'react';

import { makeStyles } from "@material-ui/core/styles";

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

const Money=({insertComma, getTotal, charge})=>{
    const classes=useStyles();

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