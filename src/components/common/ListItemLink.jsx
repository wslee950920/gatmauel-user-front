import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(() => ({
  fontMaple: {
    fontFamily: "MaplestoryOTFBold",
  },
  fontRobo: {
    fontFamily: "Roboto",
  },
}));

const ListItemLink = ({ primary, to, secondary, review }) => {
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
          secondaryTypographyProps={{
            color: "textSecondary",
            noWrap: true,
          }}
          primaryTypographyProps={
            review && {
              color: "textSecondary",
            }
          }
          classes={{
            secondary: classes.fontRobo,
            primary: classes.fontMaple,
          }}
          secondary={secondary}
        />
      </ListItem>
    </li>
  );
};

ListItemLink.propTypes = {
  primary: PropTypes.string,
  to: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  review: PropTypes.bool,
};

export default React.memo(ListItemLink);
