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
    <div className='lg:pl-20'>
      <div className="pl-4 flex items-center justify-center w-full mb-6 bg-[#00CA4E] py-4 rounded-md">
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
      </div>
    </div>
  );
}
