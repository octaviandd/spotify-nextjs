import React, { useRef } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import TextPlugin from 'gsap/dist/TextPlugin';
import { useIsomorphicLayoutEffect } from '../utils';
import LandingSectionTwo from './LandingSectionTwo';
import { gsap } from 'gsap';
import LandingSectionThree from './LandingSectionThree';

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
    <div className="row-start-1 row-end-2 col-start-1 mb-20">
      <div className="flex flex-row flex-wrap pt-20 pb-20 lg:pl-20 ">
        <div className="pb-6 text-[30px] text-slate-400">Looking for new music?</div>
        <div className="text-[60px] leading-none">
          Spotifier will help you find music based on similarity or lexical discovery
        </div>
        <div className="pt-6 cursor-pointer group ease-in-out transition duration-200" ref={buttonRef}>
          <a className="text-[20px] bg-green-600 px-4 py-2 text-white flex items-center rounded action-button">
            <button className="pr-2 start-now">Start now</button>
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
      <LandingSectionTwo></LandingSectionTwo>
      <LandingSectionThree></LandingSectionThree>
    </div>
  );
}
