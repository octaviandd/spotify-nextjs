import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../utils';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function LandingSectionTwo() {
  const tl: any = useRef();
  const lineRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (lineRef.current) {
      let ctx = gsap.context(() => {
        tl.current = gsap.timeline().fromTo(
          lineRef.current,
          {
            scaleY: 0,
            duration: 0,
          },
          {
            duration: 3,
            scaleY: 1,
            transformOrigin: 'top',
          }
        );
      }, lineRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="flex mr-4 relative lg:pl-20 start-now">
      <div className="flex flex-col mx-auto my-3 h-[1000px]">
        <div className="relative inline-block z-10 mt-3">
          <Image src="/Spotify_Icon_RGB_Green.png" width={24} height={24}></Image>
          <span className="absolute left-0 top-0 h-full w-full z-20 bg-[#00CA4E] blur-lg"></span>
        </div>
        <div
          ref={lineRef}
          style={{ background: 'linear-gradient(#d2a8ff, #a371f7 10%, #196c2e 70%, #2ea043 80%, #56d364, #000000)' }}
          className="h-full w-[3px] rounded-md mx-auto"
        ></div>
      </div>
      <div className="flex w-full flex-col mb-6 py-4 rounded-md ml-10">
        <span className="text-white text-6xl mb-10">Track search.</span>
        <span className="text-white text-3xl text-left">
          Driven by Spotify AI/ML, the search engine returns the same items as Spotify player. Super quick and super
          reliable.
        </span>
      </div>
    </div>
  );
}
