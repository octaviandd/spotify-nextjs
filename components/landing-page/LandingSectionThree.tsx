import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect, useArrayRef } from '../utils';
import { gsap } from 'gsap';

export default function LandingSectionThree() {
  const secondTl: any = useRef();
  const [refs, setRefs] = useArrayRef();
  const iconRef = useRef();
  const lineRef = useRef();
  const tl: any = useRef();

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
              start: 'top bottom', // when the top of the trigger hits the top of the viewport
              end: '+=200', // end after scrolling 500px beyond the start
              scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
              markers: true,
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
              start: 'top bottom', // when the top of the trigger hits the top of the viewport
              end: 'top top', // end after scrolling 500px beyond the start
              scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
              markers: true,
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
    <div className="flex mr-4 relative lg:pl-20 include-others">
      <div className="flex flex-col mx-auto my-3 h-[1000px]">
        <div className="relative inline-block z-10 mt-3" ref={iconRef}>
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
        <div
          ref={lineRef}
          style={{ background: 'linear-gradient(#000000, #2ea043, #2ea043, #000000' }}
          className="h-full w-[3px] rounded-md mx-auto"
        ></div>
      </div>
      <div className="flex flex-col w-full mb-6 py-4 rounded-md ml-10">
        <span className="text-white text-6xl mb-10">Include other tracks, artists or genres.</span>
        <span className="text-white text-3xl text-left">
          Recommendations are generated based on the available information for a given seed entity and matched against
          similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will
          be returned together with pool size details.
        </span>
      </div>
    </div>
  );
}
