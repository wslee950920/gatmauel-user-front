import React from "react";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const FeedMenu=({handleClose, anchorEl})=>{
    return (
        <Menu
        id="feed-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>수정</MenuItem>
        <MenuItem onClick={handleClose} style={{color:'#C70039'}}>삭제</MenuItem>
      </Menu>
    )
};

export default React.memo(FeedMenu);