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
  direction: string
  set?: object | undefined | null
  skipOutro?: boolean
}

const AnimateInOut = ({ children, from, to, durationIn, durationOut, delay, delayOut, direction, set, skipOutro } : AnimateProps) => {
  const { timeline } = useContext(TransitionContext);
  const el = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (set) {
      gsap.set(el.current, { ...set });
    }
    gsap.fromTo(el.current, {...from}, {
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
    <div ref={el}>
      {children}
    </div>
  );
};

export default React.memo(AnimateInOut);
