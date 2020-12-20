import React from "react";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const FeedMenu=({handleClose, anchorEl, feedUpdate, index, feedRemove, reviewId})=>{
    return (
      <Menu
        id="feed-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          onClick={()=>{
            feedUpdate(index)
            handleClose()
          }}
        >
          수정
        </MenuItem>
        <MenuItem 
          onClick={()=>{
            feedRemove(reviewId)
            handleClose()}} 
          style={{color:'#C70039'}}
        >
          삭제
        </MenuItem>
      </Menu>
    )
};

export default React.memo(FeedMenu);