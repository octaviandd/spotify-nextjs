import React, { ReactNode } from 'react';
import AnimateInOut from './AnimateInOut';

const FlyInOutRight = ({ children }: { children: ReactNode }) => (
  <AnimateInOut
    durationIn={1.5}
    durationOut={1}
    delay={0.5}
    delayOut={0.5 / 2}
    from={{
      transform: 'translate(100%, 0px)',
      duration: 0.25,
      ease: 'power4.out',
    }}
    to={{
      x: 0,
      ease: 'power4.inOut',
    }}
  >
    {children}
  </AnimateInOut>
);

export default FlyInOutRight;
