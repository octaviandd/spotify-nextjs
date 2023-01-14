import React, { useRef } from 'react';
import { useArrayRef, useIsomorphicLayoutEffect } from '../utils';
import { gsap } from 'gsap';
import { SongFilter } from './SongFilter';

type Props = {};

export default function MockSliders({}: Props) {
  const [refs, setRefs] = useArrayRef();
  const secondTl: any = useRef();

  useIsomorphicLayoutEffect(() => {
    gsap.fromTo(
      document.querySelector('.fake-slider'),
      { opacity: 0, duration: 0 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: document.querySelector('.composition'),
          start: 'top center',
          end: '+=300',
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
  return (
    <div className="pointer-events-none w-[190px] flex flex-col absolute top-[250px] left-[170px] fake-slider">
      <SongFilter ref={setRefs}></SongFilter>
      <SongFilter ref={setRefs}></SongFilter>
      <SongFilter ref={setRefs}></SongFilter>
      <SongFilter ref={setRefs}></SongFilter>
    </div>
  );
}
