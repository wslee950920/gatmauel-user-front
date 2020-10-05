import React, { useRef } from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import DrawerList from "./DrawerList";

const Drawer = ({ open, toggleDrawer }) => {
  const iOS = useRef(
    process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  );

  return (
    <SwipeableDrawer
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      disableBackdropTransition={!iOS.current}
      disableDiscovery={iOS.current}
      ModalProps={{ keepMounted: true }}
    >
      <DrawerList toggleDrawer={toggleDrawer} />
    </SwipeableDrawer>
  );
};

export default React.memo(Drawer);
