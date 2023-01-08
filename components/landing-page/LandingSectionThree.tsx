import React, { useRef } from 'react';
import { SongFilter } from './SongFilter';
import { useIsomorphicLayoutEffect, useArrayRef } from '../utils';
import { gsap } from 'gsap';

export default function LandingSectionThree() {
  const secondTl: any = useRef();
  const [refs, setRefs] = useArrayRef();

  useIsomorphicLayoutEffect(() => {
    if (refs.current) {
      let ctx = gsap.context(() => {
        secondTl.current = gsap.timeline().fromTo(
          refs.current,
          {
            left: 0,
          },
          {
            left: 'random(0, 400)',
            duration: 2,
            scrollTrigger: {
              trigger: document.querySelector('#trigger'),
              start: 'top top',
              end: '+=400',
              scrub: true,
            },
          }
        );
      }, refs.current);
      return () => ctx.revert();
    }
  });

  return (
    <div className=''>
      {/* <div className="pl-4 flex items-center justify-center w-full mb-6 bg-[#00CA4E] py-4 rounded-md">
        <span className="text-white text-4xl">Refine composition</span>
      </div>
      <div className="py-16 bg-[#16181c]">
        <SongFilter title="Acousticness" ref={setRefs}></SongFilter>
        <SongFilter title="Danceability" ref={setRefs}></SongFilter>
        <SongFilter title="Liveness" ref={setRefs}></SongFilter>
        <SongFilter title="Speechiness" ref={setRefs}></SongFilter>
        <SongFilter title="Tempo" ref={setRefs}></SongFilter>
        <div className='flex justify-center mt-6'>
          <button className='w-[200px] bg-white px-4 py-2 flex justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="5" cy="12" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
            </svg>
           </button>
        </div>
      </div> */}
      <div className="flex items-center mr-4 relative lg:pl-20 ">
        <div className='flex flex-col mx-auto my-3 h-[1000px]'>
          <div style={{ background: 'linear-gradient(#d2a8ff, #a371f7 10%, #196c2e 70%, #2ea043 80%, #56d364)' }} className="h-full w-[3px] rounded-md mx-auto"></div>
          <div className="relative inline-block z-10 mt-3">
            <svg aria-hidden="true" className="rotate-90" height="24" viewBox="0 0 24 24" version="1.1" width="24" data-view-component="true">
              <path fill="white" fill-rule="evenodd" d="M8.78 4.97a.75.75 0 010 1.06L2.81 12l5.97 5.97a.75.75 0 11-1.06 1.06l-6.5-6.5a.75.75 0 010-1.06l6.5-6.5a.75.75 0 011.06 0zm6.44 0a.75.75 0 000 1.06L21.19 12l-5.97 5.97a.75.75 0 101.06 1.06l6.5-6.5a.75.75 0 000-1.06l-6.5-6.5a.75.75 0 00-1.06 0z"></path>
            </svg>
            <span className="absolute left-0 top-0 h-full w-full z-20 bg-white" style={{ filter: 'blur(17px)'}}></span>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mb-6 py-4 rounded-md">
          <span className="text-white text-6xl">Include other tracks, artists or genres</span>
        </div>
      </div>
    </div>
  );
}
