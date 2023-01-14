import React, { useRef } from 'react';
import Image from 'next/image';
import { useArrayRef, useIsomorphicLayoutEffect } from '../utils';
import { gsap } from 'gsap';
import { SongFilter } from './SongFilter';
import { SongCard } from './SongCard';

export default function LandingSectionFour() {
  const iconRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const songsRef = useRef<HTMLDivElement>(null);
  const tl: any = useRef();
  const timeline: any = useRef();
  const [refs, setRefs] = useArrayRef();
  const [refs2, setRefs2] = useArrayRef();
  const secondTl: any = useRef();

  useIsomorphicLayoutEffect(() => {
    timeline.current = gsap.timeline();
    timeline.current.fromTo(
      refs2.current,
      { opacity: 0, duration: 0 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: songsRef.current,
          start: 'top bottom-=300',
          end: '+=400',
          scrub: true,
        },
      }
    );
  });

  useIsomorphicLayoutEffect(() => {
    if (refs.current) {
      let ctx = gsap.context(() => {
        secondTl.current = gsap.timeline().fromTo(
          refs.current,
          {
            left: 0,
          },
          {
            left: 'random(0, 100)',
            duration: 2,
            scrollTrigger: {
              trigger: document.querySelector('.composition'),
              start: 'top center-=200',
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
      <div className="flex flex-col mx-auto my-3 h-[1175px]">
        <div className="relative inline-block z-10 mt-3 w-[24px] h-[24px]" ref={iconRef}>
          <Image src="/connector.svg" width={24} height={24} className="rotate-90" />
          <span className="absolute left-0 top-0 h-full w-full z-20 bg-white blur-lg"></span>
        </div>
        <div
          ref={lineRef}
          style={{ background: 'linear-gradient(#000000, #797ef9, #797ef9' }}
          className="h-full w-[3px] rounded-md mx-auto"
        ></div>
        <div className="relative inline-block z-10 mt-3 w-[24px] h-[24px]">
          <Image src="/Spotify_Icon_RGB_Green.png" width={24} height={24}></Image>
          <span className="absolute left-0 top-0 h-full w-full z-20 bg-[#00CA4E] blur-lg"></span>
        </div>
      </div>
      <div className="flex flex-col w-full mb-6 py-4 rounded-md ml-10">
        <span className="text-white text-2xl lg:text-6xl mb-10">
          Fine-tune your search: refine by track composition
        </span>
        <span className="text-white text-xl lg:text-3xl text-left" id="test2">
          Unlock the full potential of your search by utilizing the advanced composition attributes of each track.
          Easily modify your search based on metrics such as loudness, mode, energy, popularity, and valence to find the
          perfect match for your needs.
        </span>
        <div className="pointer-events-none w-[225px] flex flex-col lg:hidden">
          <SongFilter ref={setRefs}></SongFilter>
          <SongFilter ref={setRefs}></SongFilter>
          <SongFilter ref={setRefs}></SongFilter>
          <SongFilter ref={setRefs}></SongFilter>
        </div>
        <div className="grid grid-cols-4 grid-rows-auto gap-y-4 mt-10 lg:hidden" ref={songsRef}>
          {Array(24)
            .fill(null)
            .map((i, idx) => (
              <SongCard
                ref={setRefs2}
                key={idx}
                item={{
                  link: `/${gsap.utils.random(1, 23, 1)}.jpg`,
                }}
              ></SongCard>
            ))}
        </div>
      </div>
    </div>
  );
}
