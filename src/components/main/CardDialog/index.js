import React from "react";

import Dialog from "@material-ui/core/Dialog";
import Grow from "@material-ui/core/Grow";

import MenuCard from "../../common/MenuCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const CardDialog = ({ open, handleClose }) => {
  //props의 기본값은 true이다.
  //따라서 Menu컴포넌트에 keepMounted={true}를 넘겨준 것과 같다.
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
