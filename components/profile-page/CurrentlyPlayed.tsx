import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react'
import { getSpotifyData, useIsomorphicLayoutEffect } from '../../components/utils';
import { gsap } from "gsap";
import { Track } from '../search-page/types';

export default function CurrentlyPlayed() {
  const { data: session } = useSession();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track>()
  const animationRef = useRef<HTMLDivElement>(null);

  const getCurrentlyPlayed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: `me/player/currently-playing`,
    }).then((data): void => {
      data && setCurrentlyPlaying(data.item)
    });
  }

   useIsomorphicLayoutEffect(() => {
     if (animationRef.current) {
       let selector = gsap.utils.selector('.bounce-bars')
       console.log(selector)
      let ctx = gsap.context(() => {
        gsap.fromTo('.action-button', { opacity: 0, y: '100' }, { opacity: 1, duration: 1.5, y: '0' });
      }, animationRef);
      return () => ctx.revert();
    }
  });

  useEffect(() => {
    session?.accessToken && getCurrentlyPlayed();
  }, [session])

  return (
    <div className='flex justify-center w-full mt-10'>
      {currentlyPlaying && <div className='border rounded-md px-2 py-1 flex items-center justify-between w-full'>
        <div>
          <div className='mb-1 font-semibold'>{currentlyPlaying.artists[0].name}</div>
          <div className='flex items-center'>
            <div className="w-[20px] h-[20px] mr-2">
              <img src={currentlyPlaying.album?.images[2].url} className="w-[20px] h-[20px]"/>
            </div>
            <div className='text-slate-500'>
              {currentlyPlaying.name}
            </div>
          </div>
        </div>
        <div className='cursor-pointer'>
          <div className="bounce-bars" ref={animationRef}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>}
    </div>
  )
}