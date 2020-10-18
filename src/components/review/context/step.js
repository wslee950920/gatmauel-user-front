import React, { createContext, useState } from "react";

const StepContext = createContext({
  state: { steps: [] },
  actions: {
    setSteps: () => {},
  },
});

const StepProvider = ({ children, datas }) => {
  const [steps, setSteps] = useState(datas.map(() => 0));

  //여기서는 useRef 쓰면 안 된다...
  const value = {
    state: { steps },
    action: { setSteps },
  };

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};

const { Consumer: StepConsumer } = StepContext;

export { StepProvider, StepConsumer };

export default StepContext;
