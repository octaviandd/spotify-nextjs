import React, { useRef } from 'react';
import { SongCard } from './SongCard';
import { gsap } from 'gsap';
import { useArrayRef, useIsomorphicLayoutEffect } from '../utils';

type Props = {};

export default function MockSongsGrid({}: Props) {
  const [refs, setRefs] = useArrayRef();
  const [refs2, setRefs2] = useArrayRef();
  const [refs3, setRefs3] = useArrayRef();
  let tl: any = useRef();
  let tl2: any = useRef();
  let tl3: any = useRef();

  useIsomorphicLayoutEffect(() => {
    tl.current = gsap.timeline();
    tl.current.fromTo(
      refs.current,
      { opacity: 0, duration: 0 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: document.querySelector('.start-now'),
          start: 'top+=300 top',
          end: '+=300',
          scrub: true,
        },
      }
    );
  });

  useIsomorphicLayoutEffect(() => {
    tl2.current = gsap.timeline();
    tl2.current.fromTo(
      refs2.current,
      { opacity: 0, duration: 0 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: document.querySelector('.start-now'),
          start: 'top+=300 top',
          end: '+=1000',
          scrub: true,
        },
      }
    );
  });

  useIsomorphicLayoutEffect(() => {
    tl3.current = gsap.timeline();
    tl3.current.fromTo(
      refs3.current,
      { opacity: 0, duration: 0 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: document.querySelector('.start-now'),
          start: 'top+=300 top',
          end: '+=1000',
          scrub: true,
        },
      }
    );
  });

  useIsomorphicLayoutEffect(() => {
    const randomIndices = Array.from({ length: 8 }, () => Math.floor(Math.random() * refs.current.length));
    randomIndices.forEach((index) => {
      gsap.timeline().to(refs.current[index], {
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: document.querySelector('#test-outro'),
          start: 'top top',
          end: '+=1000',
          scrub: true,
        },
      });
    });
  });

  useIsomorphicLayoutEffect(() => {
    const randomIndices = Array.from({ length: 8 }, () => Math.floor(Math.random() * refs2.current.length));
    randomIndices.forEach((index) => {
      gsap.timeline().to(refs2.current[index], {
        opacity: 0,
        scrollTrigger: {
          trigger: document.querySelector('#test2'),
          start: 'top+=300 top',
          end: '+=300',
          scrub: true,
          markers: true,
        },
      });
    });
  });

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <div className="absolute grid z-50 grid-cols-4 grid-rows-auto max-w-[300px] row-start-2 w-full gap-x-14 px-10 top-[70px] right-[180px] mx-auto">
        {Array(24)
          .fill(null)
          .map((i, idx) => (
            <SongCard
              ref={setRefs}
              key={idx}
              item={{
                link: `/${idx + 1}.jpg`,
              }}
            ></SongCard>
          ))}
      </div>
      <div className="absolute grid z-20 grid-cols-4 grid-rows-auto max-w-[300px] row-start-2 w-full gap-x-14 px-10 top-[70px] right-[180px] mx-auto">
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
      <div className="absolute grid grid-cols-4 z-10 grid-rows-auto max-w-[300px] row-start-2 w-full gap-x-14 px-10 top-[70px] right-[180px] mx-auto">
        {Array(24)
          .fill(null)
          .map((i, idx) => (
            <SongCard
              ref={setRefs3}
              key={idx}
              item={{
                link: `/${gsap.utils.random(1, 23, 1)}.jpg`,
              }}
            ></SongCard>
          ))}
      </div>
    </div>
  );
}
