import React from "react";
import { Link } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const AccountMenu = ({ menuId, accountEl, isMenuOpen, handleMenuClose }) => {
  //props의 기본값은 true이다.
  //따라서 Menu컴포넌트에 keepMounted={true}를 넘겨준 것과 같다.
  return (
    <Menu
      anchorEl={accountEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="#" onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem component={Link} to="#" onClick={handleMenuClose}>
        My account
      </MenuItem>
    </Menu>
  );
};

export default React.memo(AccountMenu);
