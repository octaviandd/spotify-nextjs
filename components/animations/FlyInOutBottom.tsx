import React, { ReactNode } from 'react';
import AnimateInOut from './AnimateInOut';

const FlyInOutBottom = ({ children }: { children: ReactNode }) => (
  <AnimateInOut
    direction="left"
    durationIn={1}
    durationOut={1}
    delay={0.25}
    delayOut={0.25}
    from={{
      transform: 'translate(0, 100vh)',
      ease: 'power4.out',
    }}
    to={{
      ease: 'power4.in',
      transform: 'translate(0, 0)',
    }}
  >
    {children}
  </AnimateInOut>
);

export default FlyInOutBottom;
