import React from "react";
import { Route } from "react-router-dom";
import loadable from "@loadable/component";

import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Write = loadable(() => import("./Write"));
const Camera = loadable(() => import("./Camera"));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({
  open,
  handleClose,
  imgs,
  handleFileOnChange,
  handleFileRemove,
  onChange,
  content,
  onSubmit,
  onCamera,
}) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Route
        path={"/review/write"}
        component={() => (
          <Write
            imgs={imgs}
            handleFileOnChange={handleFileOnChange}
            handleFileRemove={handleFileRemove}
            onChange={onChange}
            content={content}
            onSubmit={onSubmit}
            onCamera={onCamera}
            handleClose={handleClose}
          />
        )}
        exact
      />
      <Route
        path={"/review/camera"}
        component={() => <Camera handleClose={handleClose} />}
        exact
      />
    </Dialog>
  );
};

export default React.memo(FullScreenDialog);
