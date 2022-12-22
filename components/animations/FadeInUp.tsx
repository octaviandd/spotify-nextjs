import React, { ReactNode, useRef } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '../utils';

const FadeInUp = ({ children }: { children: ReactNode }) => {
  const el = useRef<HTMLDivElement>(null);

  gsap.set(el.current, { transform: 'translateY(100%)' });

  useIsomorphicLayoutEffect(() => {
    gsap.fromTo(
      el.current,
      { opacity: 0, transform: 'translateY(300px)' },
      {
        transform: 'translateY(0%)',
        opacity: 1,
        delay: 1.5,
        duration: 1,
        ease: 'power4.inOut',
      }
    );
  }, []);

  return <div ref={el}>{children}</div>;
};

export default FadeInUp;
