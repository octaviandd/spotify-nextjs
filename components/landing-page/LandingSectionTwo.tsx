import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../utils';
import Image from 'next/image';
import { gsap } from 'gsap';

type Props = {};

export default function LandingSectionTwo({}: Props) {
  const underlineRef = useRef<HTMLElement>(null);
  const tl: any = useRef();

  useIsomorphicLayoutEffect(() => {});
  return (
    <div className="flex mr-4 relative lg:pl-20 start-now">
      <div className="flex flex-col mx-auto my-3 h-[1000px]">
        <div className="relative inline-block z-10 mt-3">
          <Image src="/Spotify_Icon_RGB_Green.png" width={24} height={24}></Image>
          <span
            className="absolute left-0 top-0 h-full w-full z-20 bg-[#00CA4E]"
            style={{ filter: 'blur(17px)' }}
          ></span>
        </div>
        <div
          style={{ background: 'linear-gradient(#d2a8ff, #a371f7 10%, #196c2e 70%, #2ea043 80%, #56d364, #000000)' }}
          className="h-full w-[3px] rounded-md mx-auto"
        ></div>
        <div className="relative inline-block z-10 mt-3">
          <svg
            aria-hidden="true"
            height="24"
            className="rotate-90"
            viewBox="0 0 24 24"
            version="1.1"
            width="24"
            data-view-component="true"
          >
            <path
              fill="white"
              fill-rule="evenodd"
              d="M8.78 4.97a.75.75 0 010 1.06L2.81 12l5.97 5.97a.75.75 0 11-1.06 1.06l-6.5-6.5a.75.75 0 010-1.06l6.5-6.5a.75.75 0 011.06 0zm6.44 0a.75.75 0 000 1.06L21.19 12l-5.97 5.97a.75.75 0 101.06 1.06l6.5-6.5a.75.75 0 000-1.06l-6.5-6.5a.75.75 0 00-1.06 0z"
            ></path>
          </svg>
          <span className="absolute left-0 top-0 h-full w-full z-20 bg-white" style={{ filter: 'blur(17px)' }}></span>
        </div>
      </div>
      <div className="flex justify-center w-full mb-6 py-4 rounded-md ml-10">
        <span className="text-white text-6xl">Search for a track</span>
      </div>
    </div>
  );
}

const SearchBarStyle = {
  boxShadow: '0 10px 15px -3px rgba(0,0,0,.1) 0 4px 6px -4px rgba(0,0,0,.1)',
};
