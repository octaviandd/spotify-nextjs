import React, { useRef } from 'react';
import { useArrayRef, useIsomorphicLayoutEffect } from '../utils';
import Image from 'next/image';
import { gsap } from 'gsap';
import { SongCard } from './SongCard';

const SearchBarStyle = {
  boxShadow: '0 10px 15px -3px rgba(0,0,0,.1) 0 4px 6px -4px rgba(0,0,0,.1)',
};

export default function LandingSectionTwo() {
  const tl: any = useRef();
  const songsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [refs, setRefs] = useArrayRef();
  let timeline: any = useRef();

  useIsomorphicLayoutEffect(() => {
    timeline.current = gsap.timeline();
    timeline.current.fromTo(
      refs.current,
      { opacity: 0, duration: 0 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: songsRef.current,
          start: 'top bottom-=300',
          end: '+=500',
          scrub: true,
        },
      }
    );
  });

  useIsomorphicLayoutEffect(() => {
    if (lineRef.current) {
      let ctx = gsap.context(() => {
        tl.current = gsap.timeline().fromTo(
          lineRef.current,
          {
            scaleY: 0,
            duration: 0,
          },
          {
            duration: 3,
            scaleY: 1,
            transformOrigin: 'top',
          }
        );
      }, lineRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="flex mr-4 relative lg:pl-20 start-now">
      <div className="flex flex-col mx-auto mb-3 h-[1000px]">
        <div className="relative inline-block z-10 w-[24px] h-[24px] mb-4">
          <Image src="/Spotify_Icon_RGB_Green.png" width={24} height={24}></Image>
          <span className="absolute left-0 top-0 h-full w-full z-20 bg-[#00CA4E] blur-lg"></span>
        </div>
        <div
          ref={lineRef}
          style={{ background: 'linear-gradient(#d2a8ff, #a371f7 10%, #196c2e 70%, #2ea043 80%, #56d364, #000000)' }}
          className="h-full w-[3px] rounded-md mx-auto"
        ></div>
      </div>
      <div className="flex w-full flex-col mb-6 pb-4 rounded-md ml-6">
        <span className="text-white text-2xl lg:text-6xl mb-10">Track search</span>
        <span className="text-white text-xl lg:text-3xl text-left">
          Powered by advanced Spotify AI and machine learning technology, our search engine delivers lightning-fast,
          highly accurate results that mirror those on the Spotify player. Trust in its unparalleled speed and
          reliability.
        </span>
        <div
          style={SearchBarStyle}
          className="flex items-center mt-10 py-3 px-4 bg-[#ffffff] w-[275px] rounded-xl search-bar lg:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
              fill="black"
            />
          </svg>
          <span className="pl-4 text-[0.875rem] text-[#9ca3af] search-bar-input">Ballads Metallica</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-auto grid-rows-auto gap-y-4 gap-x-4 mt-10 lg:hidden" ref={songsRef}>
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
      </div>
    </div>
  );
}
