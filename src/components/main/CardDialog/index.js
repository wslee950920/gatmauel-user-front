import React from "react";

import Dialog from "@material-ui/core/Dialog";
import Grow from "@material-ui/core/Grow";

import MenuCard from "../../common/MenuCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const CardDialog = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="menu card"
        aria-describedby="menu detail"
        keepMounted
        TransitionComponent={Transition}
        TransitionProps={{
          timeout: { exit: 500 },
          style: { transformOrigin: "bottom right" },
        }}
      >
        <MenuCard handleClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default React.memo(CardDialog);
