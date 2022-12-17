import React, { useState, useEffect } from 'react'
import { Track } from '../../types/components';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';

export default function FavoriteTracks() {
  const { data: session } = useSession();
  const [currentTracks, setCurrentTracks] = useState<Track[]>();
  const [currentLimit, setCurrentLimit] = useState(10)
  const [currentOffset, setCurrentOffset] = useState(0)

  const getCurrentTracks = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {limit: currentLimit, offset: currentOffset},
      queryLink: `me/top/tracks`,
    }).then((data): void => {
      data && setCurrentTracks(data.items)
    });
  }

  const getTopOneHundred = () => {
    setCurrentLimit(50);
    setCurrentOffset(50);
  }

  useEffect(() => {
    session?.accessToken && getCurrentTracks();
  }, [session, currentLimit])

  return (
    <div className='px-20'>
      <div className='flex text-xl'>
        <p className='mb-6 text-xl'>Favorite Songs</p>
        <div className='ml-3'>
          <span onClick={() => setCurrentLimit(10)}  className='border px-3 py-2 rounded-md cursor-pointer'>10</span>
        </div>
        <div className='ml-3'>
          <span onClick={() => setCurrentLimit(25)} className='border px-3 py-2 rounded-md cursor-pointer'>25</span>
        </div>
        <div className='ml-3'>
          <span onClick={() => setCurrentLimit(50)} className='border px-3 py-2 rounded-md cursor-pointer'>50</span>
        </div>
         <div className='ml-3'>
          <span onClick={() => getTopOneHundred()} className='border px-3 py-2 rounded-md cursor-pointer'>100</span>
        </div>
      </div>
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