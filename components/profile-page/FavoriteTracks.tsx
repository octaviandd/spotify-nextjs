import React, { useState, useRef, useEffect } from 'react'
import { Track } from '../../types/components';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';

export default function FavoriteTracks() {
  const { data: session } = useSession();
  const [currentTracks, setCurrentTracks] = useState<Track[]>()

  const getCurrentTracks = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {limit: 50, offset: 0},
      queryLink: `me/top/tracks`,
    }).then((data): void => {
      data && setCurrentTracks(data.items)
    });
  }

  useEffect(() => {
    session?.accessToken && getCurrentTracks();
  }, [session])

  return (
    <div className='px-20'>
      <p className='mb-6 text-xl'>Favorite Songs</p>
      <div className='grid-cols-2 grid grid-rows-auto gap-y-1 gap-x-3'>
        {currentTracks && currentTracks.map((track, index) => (
          <div className='border rounded-md px-2 py-1 flex items-center justify-between' key={index}>
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
    </div>
  )
}