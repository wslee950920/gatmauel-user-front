import React from "react";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

const Circular = ({ container, inside }) => {
  return (
    <div style={container}>
      <CircularProgress size={30} style={inside} />
    </div>
  );
};

Circular.propTypes = {
  style: PropTypes.object,
  height: PropTypes.object,
};

export default React.memo(Circular);
