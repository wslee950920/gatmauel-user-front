import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(() => ({
  primary: {
    fontFamily: "MaplestoryOTFBold",
  },
}));

const ListItemLink = ({ primary, to }) => {
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
        <ListItemText
          primary={primary}
          primaryTypographyProps={{
            color: "textSecondary",
          }}
          classes={{ primary: classes.primary }}
        />
      </ListItem>
    </li>
  );
};

ListItemLink.propTypes = {
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default React.memo(ListItemLink);
