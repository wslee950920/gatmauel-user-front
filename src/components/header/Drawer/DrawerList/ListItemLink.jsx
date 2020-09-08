import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  primary: {
    textDecorationLine: "line-through",
  },
});

const ListItemLink = ({ icon, primary, to }) => {
  const classes = useStyles();

  const renderLink = useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText
          primary={primary}
          classes={{
            primary: clsx({ [classes.primary]: primary === "주문하기" }),
          }}
          primaryTypographyProps={{
            color: clsx(primary === "주문하기" ? "textSecondary" : "inherit"),
          }}
        />
      </ListItem>
    </li>
  );
};

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default React.memo(ListItemLink);
