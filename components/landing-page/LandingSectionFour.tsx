import React, { useRef } from 'react';
import Image from 'next/image';
import { useIsomorphicLayoutEffect } from '../utils';
import { gsap } from 'gsap';

export default function LandingSectionFour() {
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
            opacity: 0,
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
            opacity: 1,
            transformOrigin: 'top',
          }
        );
      }, lineRef);
      return () => ctx.revert();
    }
  }, []);
  return (
    <div className="flex mr-4 relative lg:pl-20 composition">
      <div className="flex flex-col mx-auto my-3 h-[1000px]">
        <div className="relative inline-block z-10 mt-3" ref={iconRef}>
          <Image src="/connector.svg" width={24} height={24} className="rotate-90" />
          <span className="absolute left-0 top-0 h-full w-full z-20 bg-white blur-lg"></span>
        </div>
        <div
          ref={lineRef}
          style={{ background: 'linear-gradient(#000000, #797ef9, #797ef9' }}
          className="h-full w-[3px] rounded-md mx-auto"
        ></div>
        <div className="relative inline-block z-10 mt-3">
          <Image src="/Spotify_Icon_RGB_Green.png" width={24} height={24}></Image>
          <span className="absolute left-0 top-0 h-full w-full z-20 bg-[#00CA4E] blur-lg"></span>
        </div>
      </div>
      <div className="flex flex-col w-full mb-6 py-4 rounded-md ml-10">
        <span className="text-white text-6xl mb-10">Refine the search by track composition.</span>
        <span className="text-white text-3xl text-left" id='test2'>
          Each song is defined as a composition of multiple factors. Modify the search based on attributes such as how
          loudness, mode, energy, popularity or valence.
        </span>
      </div>
    </div>
  );
}
