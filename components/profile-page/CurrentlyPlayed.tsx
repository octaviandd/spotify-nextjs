import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef, SetStateAction } from 'react'
import { getSpotifyData } from '../../components/utils';
import { Data, Track } from "../../types/components";

export default function CurrentlyPlayed() {
  const { data: session } = useSession();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track>()
  const [currentRecommended, setCurrentRecommended] = useState<Track[]>([])
  const animationRef = useRef<HTMLDivElement>(null);

  const getCurrentlyPlayed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: `me/player/currently-playing`,
    }).then((data): void => {
      data && setCurrentlyPlaying(data.item)
      data && getRecommendedSongs(data.item.id);
    });
  }

  const getRecommendedSongs = (id: string) => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { seed_tracks: id, type: 'track', limit: 3, offset: 0 },
      queryLink: 'recommendations',
    }).then((data: Data): void => {
      if (data.tracks && Object.keys(data.tracks).length > 0) {
        setCurrentRecommended(data.tracks as SetStateAction<Track[]>);
      }
    });
  }

  useEffect(() => {
    session?.accessToken && getCurrentlyPlayed();
  }, [session?.accessToken])

  return (
    <div className='flex justify-center flex-col w-full mt-10'>
      <p className='text-xl mb-6'>Currently playing</p>
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
      <p className='text-xl mb-6 mt-4'>Recommended tracks:</p>
      {currentRecommended && currentRecommended.map((track, index) => (
        <div className='border rounded-md px-2 py-1 flex items-center justify-between gap-y-3' key={index}>
          <div>
            <div className='mb-1 font-semibold'>{track.artists[0].name}</div>
            <div className='flex items-center'>
              <div className="w-[20px] h-[20px] mr-2">
                <img src={track.album?.images[2].url} className="w-[20px] h-[20px]"/>
              </div>
              <div className='text-slate-500'>
                {track.name}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}