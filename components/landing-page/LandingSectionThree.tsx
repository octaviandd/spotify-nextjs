import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../utils';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function LandingSectionThree() {
  const iconRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tl: any = useRef();

  useIsomorphicLayoutEffect(() => {
    if (iconRef.current) {
      let ctx = gsap.context(() => {
        tl.current = gsap.timeline().fromTo(
          iconRef.current,
          {
            scale: 0,
            duration: 0,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: iconRef.current,
              start: 'top bottom',
              end: '+=200',
              scrub: true,
            },
            stagger: 0.25,
            duration: 0.5,
            scale: 1,
            opacity: 1,
            transformOrigin: 'center',
          }
        );
      }, iconRef);
      return () => ctx.revert();
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (lineRef.current) {
      let ctx = gsap.context(() => {
        tl.current = gsap.timeline().fromTo(
          lineRef.current,
          {
            scale: 0,
            duration: 0,
          },
          {
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
            stagger: 0.25,
            duration: 0.5,
            scale: 1,
            transformOrigin: 'top',
          }
        );
      }, lineRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="flex mr-4 relative lg:pl-20 include-others">
      <div className="flex flex-col mx-auto my-3 h-[1000px]">
        <div className="relative inline-block z-10 mt-3" ref={iconRef}>
          <Image src="/connector.svg" width={24} height={24} className="rotate-90" />
          <span className="absolute left-0 top-0 h-full w-full z-20 bg-white blur-lg"></span>
        </div>
        <div
          ref={lineRef}
          style={{ background: 'linear-gradient(#000000, #2ea043, #2ea043, #000000' }}
          className="h-full w-[3px] rounded-md mx-auto"
        ></div>
      </div>
      <div className="flex flex-col w-full mb-6 py-4 rounded-md ml-10">
        <span className="text-white text-6xl mb-10" id="test-outro">
          Include other tracks, artists or genres.
        </span>
        <span className="text-white text-3xl text-left">
          Recommendations are generated based on the available information for a given seed entity and matched against
          similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will
          be returned together with pool size details.
        </span>
      </div>
    </div>
  );
}
