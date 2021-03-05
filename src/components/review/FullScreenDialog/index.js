import React, { useState, useCallback } from "react";
import { Route } from "react-router-dom";
import loadable from "@loadable/component";

import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const WriteCon = loadable(() => import("../../../containers/review/WriteCon"));
const CameraCon = loadable(() =>
  import("../../../containers/review/CameraCon")
);
const UpdateCon = loadable(() =>
  import("../../../containers/review/UpdateCon")
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ open, handleClose, hashtagUpdate }) => {
  const [rOnly, setROnly] = useState(true);

  const onEntered = useCallback(() => {
    setROnly(false);
  }, []);
  const onExit = useCallback(() => {
    setROnly(true);
  }, []);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      onEntered={onEntered}
      onExit={onExit}
    >
      <Route
        path={"/review/write"}
        render={(routeProps) => <WriteCon {...routeProps} rOnly={rOnly} />}
        exact
      />
      <Route path={"/review/camera"} component={CameraCon} exact />
      <Route
        path={"/review/update/:index"}
        render={(routeProps) => (
          <UpdateCon {...routeProps} hashtagUpdate={hashtagUpdate} />
        )}
        exact
      />
    </Dialog>
  );
};

export default React.memo(FullScreenDialog);
