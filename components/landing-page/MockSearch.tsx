import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../utils';
import { gsap } from 'gsap';

type Props = {};

const SearchBarStyle = {
  boxShadow: '0 10px 15px -3px rgba(0,0,0,.1) 0 4px 6px -4px rgba(0,0,0,.1)',
};

export default function MockSearch({}: Props) {
  const inputBarRef = useRef<HTMLDivElement>(null);
  const tl: any = useRef();

  useIsomorphicLayoutEffect(() => {
    if (inputBarRef.current) {
      let ctx = gsap.context(() => {
        tl.current = gsap
          .timeline()
          .to('.search-bar', {
            translateY: -220,
            translateX: -150,
            scale: 0.5,
            duration: 1,
            scrollTrigger: {
              trigger: document.querySelector('#starter'),
              start: 'top top',
              end: '+=375',
              scrub: true,
            },
          })
          .fromTo(
            '.search-bar-input',
            {
              text: 'Search for songs',
              duration: 0,
            },
            {
              text: 'Ballads from Metallica',
              duration: 2,
              scrollTrigger: {
                trigger: document.querySelector('.start-now'),
                start: 'top top',
                end: '+=175',
                scrub: true,
              },
            }
          );
      }, inputBarRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div
      className="absolute h-[600px] max-w-[550px] mx-auto left-0 right-0 top-0 grid grid-cols-mockup grid-rows-mockup"
      ref={inputBarRef}
    >
      <div
        style={SearchBarStyle}
        className="flex items-center py-3 px-4 bg-[#ffffff] w-[400px] rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 search-bar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
            fill="black"
          />
        </svg>
        <span className="pl-4 text-[0.875rem] text-[#9ca3af] search-bar-input"></span>
      </div>
    </div>
  );
}
