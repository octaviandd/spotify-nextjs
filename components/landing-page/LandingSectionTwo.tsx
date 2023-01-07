import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../utils';
import Image from 'next/image';
import { gsap } from 'gsap';

type Props = {};

export default function LandingSectionTwo({}: Props) {
  const underlineRef = useRef<HTMLElement>(null);
  const tl: any = useRef();

  useIsomorphicLayoutEffect(() => {
    // if (underlineRef.current) {
    //   let ctx = gsap.context(() => {
    //     tl.current = gsap
    //       .timeline({ repeat: -1 })
    //       .fromTo(underlineRef.current, { width: '0%', left: '0%' }, { width: '100%', duration: 1.5, yoyo: true })
    //       .add('midway')
    //       .fromTo(underlineRef.current, { width: '100%', left: '0%' }, { width: '0%', left: '100%', duration: 1.5 });
    //   }, underlineRef);
    //   return () => ctx.revert();
    // }
  });
  return (
    <div className="flex flex-wrap mr-4 songs-filter relative lg:pl-20 mb-40 mt-20">
      <div className="flex items-center justify-center w-full bg-[#00CA4E] mb-6 py-4 rounded-md">
        <span className="text-white text-4xl">Search for a track</span>
      </div>
      <div className="py-16 bg-[#16181c] w-full mx-auto flex justify-center">
        <div style={SearchBarStyle} className="flex items-center py-3 px-4 bg-[#ffffff] w-[400px] rounded-xl search-bar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
              fill="black"
            />
          </svg>
          <span className="pl-4 text-[0.875rem] text-[#9ca3af] search-bar-input">Search powered by Spotify AI/ML</span>
        </div>
      </div>
    </div>
  );
}

const SearchBarStyle = {
  boxShadow: '0 10px 15px -3px rgba(0,0,0,.1) 0 4px 6px -4px rgba(0,0,0,.1)',
};

