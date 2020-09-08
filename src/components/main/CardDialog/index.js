import React from "react";

import Dialog from "@material-ui/core/Dialog";

import MenuCard from "../../common/MenuCard";

const CardDialog = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="menu card"
        aria-describedby="menu detail"
      >
        <MenuCard />
      </Dialog>
    </div>
  );
};

export default React.memo(CardDialog);
