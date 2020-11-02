import React from 'react';

import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import kTime from '../../../lib/kTime'

const useStyles = makeStyles((theme) => ({
    inline: {
      display: "inline",
      fontFamily: "Roboto",
    },
    multiline: {
      margin: theme.spacing(1.5, 0),
    },
  }));

const Head=({title, time})=>{
    const classes = useStyles();

    return(
        <Container maxWidth="sm">
          <ListItemText
            primary={title}
            secondary={
              <Typography
                component="span"
                variant="caption"
                className={classes.inline}
                color="textPrimary"
              >
                {kTime(time)}
              </Typography>
            }
            classes={{ multiline: classes.multiline }}
          />
          <Divider />
        </Container>
      )
}

export default React.memo(Head);