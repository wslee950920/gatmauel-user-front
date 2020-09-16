import React from "react";
import { Link } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const AccountMenu = ({ menuId, accountEl, isMenuOpen, handleMenuClose }) => {
  return (
    <Menu
      anchorEl={accountEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
        My account
      </MenuItem>
    </Menu>
  );
};

export default React.memo(AccountMenu);
