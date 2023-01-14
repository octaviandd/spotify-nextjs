import React, { useRef } from 'react';
import TextPlugin from 'gsap/dist/TextPlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Flip from 'gsap/dist/Flip';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '../utils';
import { MockSelect } from './MockSelect';
import MockSliders from './MockSliders';
import MockSearch from './MockSearch';
import MockSongsGrid from './MockSongsGrid';

export default function MockupPage() {
  const displayPage = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger, TextPlugin, Flip);

  useIsomorphicLayoutEffect(() => {
    gsap.to(displayPage.current, {
      opacity: 1,
      stagger: 1,
      scrollTrigger: {
        trigger: document.querySelector('#pin'),
        pin: true,
        start: 'top top',
        end: '+=3000',
        scrub: true,
        pinSpacing: false,
      },
    });
  }, []);

  return (
    <div className="pt-20 right-0 hidden lg:block" ref={displayPage} id="pin">
      <div className="relative w-full h-full">
        <div className="bg-[#273138] opacity-[0.9] max-w-[550px] mt-[10px] mx-auto p-[10px] rounded-t-lg flex gap-1.5 blur-sm">
          <div className="bg-[red] inline-block w-[10px] h-[10px] rounded-full "></div>
          <div className="bg-[yellow] inline-block w-[10px] h-[10px] rounded-full "></div>
          <div className="bg-[green] inline-block w-[10px] h-[10px] rounded-full "></div>
        </div>
        <div className="h-[600px] blur-sm bg-[rgba(0,0,0,.2)] max-w-[550px] mx-auto opacity-[0.3]"></div>
        <MockSearch></MockSearch>
        <MockSelect></MockSelect>
        <MockSliders></MockSliders>
        <MockSongsGrid></MockSongsGrid>
      </div>
    </div>
  );
}
