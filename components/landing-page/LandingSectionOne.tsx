import React, { useRef } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import TextPlugin from 'gsap/dist/TextPlugin';
import { useIsomorphicLayoutEffect } from '../utils';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function LandingSectionOne() {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  const buttonRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (buttonRef.current) {
      let ctx = gsap.context(() => {
        gsap.fromTo('.action-button', { opacity: 0, y: '100' }, { opacity: 1, duration: 1.5, y: '0' });
      }, buttonRef);
      return () => ctx.revert();
    }
  });

  return (
    <div className="row-start-1 row-end-2 col-start-1 flex items-center mb-20">
      <div className="flex flex-row flex-wrap pt-20 pb-10 w-full lg:w-1/2">
        <div className="pb-6 text-[30px] text-slate-400">Looking for new music?</div>
        <div className="text-4xl text-white leading-none">
          Spotifier.
          <br />
          Advanced Spotify features for enhanced music experience
        </div>
        <div className="pt-6 cursor-pointer group ease-in-out transition duration-200" ref={buttonRef}>
          <a className="text-[20px] bg-green-600 px-4 py-2 text-white flex items-center rounded action-button">
            <button className="pr-2">Start now</button>
            <svg
              className="group-hover:translate-x-2 ease-in-out duration-300"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="w-1/2 justify-center hidden lg:flex">
        <div className="relative inline-block z-10 mt-3">
          <Image src="/Spotify_Icon_RGB_Green.png" className="z-100" width={300} height={300}></Image>
          <span className="absolute left-0 top-0 h-full w-full rounded-full z-20 bg-[#00CA4E] blur-lg opacity-50"></span>
        </div>
      </div>
    </div>
  );
}
