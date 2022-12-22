import { useRef, useContext, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '../utils';
import { TransitionContext } from './TransitionContext';

const FadeInOut = ({ children }: { children: ReactNode }) => {
  const { timeline } = useContext(TransitionContext);
  const el = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.fromTo(
      el.current,
      { opacity: 0, transform: 'translateY(300px)' },
      {
        transform: 'translateY(0%)',
        opacity: 1,
        delay: 1,
        duration: 0.75,
        ease: 'power4.inOut',
      }
    );

    timeline.add(
      gsap.to(el.current, {
        opacity: 0,
        duration: 0.75,
        transform: 'translateY(300px)',
        ease: 'power4.inOut',
      }),
      0
    );
  }, []);

  return <div ref={el}>{children}</div>;
};

export default FadeInOut;
