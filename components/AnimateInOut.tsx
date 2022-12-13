import React, { useRef, useContext, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from './utils';
import { TransitionContext } from './TransitionContext';

interface AnimateProps {
  children: ReactNode,
  from: object,
  to: object
  durationIn: number
  durationOut: number
  delay: number
  delayOut: number
  set?: object | undefined | null
  skipOutro?: boolean
}

const AnimateInOut = ({ children, from, to, durationIn, durationOut, delay, delayOut, set, skipOutro } : AnimateProps) => {
  const { timeline } = useContext(TransitionContext);
  const el = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (set) {
      gsap.set(el.current, { ...set });
    }
    gsap.to(el.current, {
      ...to,
      delay: delay || 0,
      duration: durationIn,
    });

    if (!skipOutro) {
      timeline.add(
        gsap.to(el.current, {
          ...from,
          delay: delayOut || 0,
          duration: durationOut,
        }),
        0
      );
    }
  }, []);

  return (
    <div style={{ transform: 'translate(100%, 0px)', transitionDuration: '0.25', transitionTimingFunction: 'power4.out' }} ref={el}>
      {children}
    </div>
  );
};

export default React.memo(AnimateInOut);
