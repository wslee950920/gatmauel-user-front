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
        프로필
      </MenuItem>
      <MenuItem component={Link} to="/account" onClick={handleMenuClose}>
        내 계정
      </MenuItem>
    </Menu>
  );
};

export default React.memo(AccountMenu);
