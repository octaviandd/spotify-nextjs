import { useRef, useContext, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from './utils';
import { TransitionContext } from './TransitionContext';

const FadeInOut = ({ children }: { children: ReactNode }) => {
  const { timeline } = useContext(TransitionContext);
  const el = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.to(el.current, {
      opacity: 1,
      duration: 1,
    });

    timeline.add(
      gsap.to(el.current, {
        opacity: 0,
        duration: 2,
      }),
      0
    );
  }, []);

  return (
    <div ref={el} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default FadeInOut;
