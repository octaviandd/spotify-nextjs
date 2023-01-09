import React from 'react';
import { SongCard } from './SongCard';
import { gsap } from 'gsap';
import { useArrayRef, useIsomorphicLayoutEffect } from '../utils';

type Props = {};

export default function MockSongsGrid({}: Props) {
  const [refs, setRefs] = useArrayRef();

  useIsomorphicLayoutEffect(() => {
    gsap.fromTo(
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

  return (
    <div className="grid grid-cols-4 grid-rows-auto max-w-[300px] row-start-2 w-full gap-x-14 px-10 absolute top-[70px] right-[180px] mx-auto">
      {Array(24)
        .fill(null)
        .map((i, idx) => (
          <SongCard
            ref={setRefs}
            key={idx}
            item={{
              link: `/${idx + 1}.jpg`,
              title: 'Fade into Black',
              artist: 'Metallica',
            }}
          ></SongCard>
        ))}
    </div>
  );
}
