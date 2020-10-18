import React from 'react';

import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    inline: {
      display: "inline",
      fontFamily: "Roboto",
    },
    multiline: {
      margin: theme.spacing(1.5, 0),
    },
  }));

const Head=()=>{
    const classes = useStyles();

    return(
        <Container maxWidth="sm">
          <ListItemText
            primary="공지사항 제목"
            secondary={
              <Typography
                component="span"
                variant="caption"
                className={classes.inline}
                color="textPrimary"
              >
                20/10/18
              </Typography>
            }
            classes={{ multiline: classes.multiline }}
          />
          <Divider />
        </Container>
      )
}

export default Head;