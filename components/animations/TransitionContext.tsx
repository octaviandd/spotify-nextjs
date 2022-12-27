import React, { useState, createContext } from 'react';
import gsap from 'gsap';

type AppContextInterface = {
  timeline: any;
  setTimeline: Function | undefined;
  background: any;
  setBackground: Function | undefined;
};

const TransitionContext = createContext<AppContextInterface | null>({
  timeline: undefined,
  setTimeline: undefined,
  background: undefined,
  setBackground: undefined,
});

const TransitionProvider = ({ children }: { children: any }) => {
  const [timeline, setTimeline] = useState(() => gsap.timeline({ paused: true }));
  const [background, setBackground] = useState('white');

  return (
    <TransitionContext.Provider
      value={{
        timeline,
        setTimeline,
        background,
        setBackground,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export { TransitionContext, TransitionProvider };
