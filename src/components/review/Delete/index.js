import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  cancel: {
    textAlign: "center",
    paddingTop: theme.spacing(1),
  },
  confirm: {
    color: theme.palette.secondary.dark,
    textAlign: "center",
  },
  title: {
    padding: theme.spacing(3, 3, 1.5, 3),
  },
  menu: {
    padding: theme.spacing(0.5),
  },
}));

const DeleteDialog = ({ rOpen, closeRemove, feedRemove }) => {
  const classes = useStyles();

  return (
    <Dialog aria-labelledby="dialog-title" open={rOpen} onClose={closeRemove}>
      <DialogTitle id="dialog-title" classes={{ root: classes.title }}>
        삭제 하시겠습니까?
      </DialogTitle>
      <Divider />
      <List>
        <ListItem button divider onClick={feedRemove} className={classes.menu}>
          <ListItemText
            primary={"확인"}
            classes={{ primary: classes.confirm }}
          />
        </ListItem>
        <ListItem button onClick={closeRemove} className={classes.menu}>
          <ListItemText
            primary={"취소"}
            classes={{ primary: classes.cancel }}
          />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default React.memo(DeleteDialog);
