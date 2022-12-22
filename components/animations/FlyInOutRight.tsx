import React, { ReactNode } from 'react';
import AnimateInOut from './AnimateInOut';

const FlyInOutRight = ({ children }: { children: ReactNode }) => (
  <AnimateInOut
    direction="right"
    durationIn={1.5}
    durationOut={0.75}
    delay={0.5}
    delayOut={0.5 / 2}
    from={{
      transform: 'translateX(-100%)',
      duration: 0.25,
      ease: 'power4.out',
    }}
    to={{
      transform: 'translateX(0%)',
      ease: 'power4.inOut',
    }}
  >
    {children}
  </AnimateInOut>
);

export default FlyInOutRight;
