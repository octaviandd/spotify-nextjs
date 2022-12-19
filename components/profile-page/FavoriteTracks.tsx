import React, { useState, useEffect } from 'react'
import { Data, Track } from '../../types/components';
import { useSession } from 'next-auth/react';
import { getSpotifyData, tracksReducer } from '../utils';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export default function FavoriteTracks() {
  const { data: session } = useSession();
  const [currentTracks, setCurrentTracks] = useState<Track[]>();
  const [currentLimit, setCurrentLimit] = useState(10)
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentTracksValues, setCurrentTracksValues] = useState<any>();

  const getCurrentTracks = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {limit: currentLimit, offset: currentOffset},
      queryLink: `me/top/tracks`,
    }).then((data : Data): void => {
      data && setCurrentTracks(data.items)
      let ids = data?.items?.map(item => item.id)
      getSongsValues(ids as string[]);
    });
  }

  const getTopOneHundred = () => {
    setCurrentLimit(50);
    setCurrentOffset(50);
  }

  useEffect(() => {
    session?.accessToken && getCurrentTracks();
  }, [session, currentLimit])

  const getSongsValues = (ids : string[]) => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {ids, offset: 0},
      queryLink: `audio-features/`,
    }).then((data: Data): void => {
      data.audio_features && setCurrentTracksValues(tracksReducer(data.audio_features));
    });
  }

  return (
    <div className='px-20 mt-4'>
      <div className='flex text-xl'>
        <p className='mb-6 text-xl'>Favorite Songs</p>
        <div className='ml-3'>
          <span onClick={() => setCurrentLimit(10)}  className={currentLimit == 10 ? 'bg-black text-white border px-3 py-2 rounded-md cursor-pointer ease-in-out' : 'border px-3 py-2 rounded-md cursor-pointer ease-in-out'}>10</span>
        </div>
        <div className='ml-3'>
          <span onClick={() => setCurrentLimit(25)} className={currentLimit == 25 ? 'bg-black text-white border px-3 py-2 rounded-md cursor-pointer ease-in-out' : 'border px-3 py-2 rounded-md cursor-pointer ease-in-out'}>25</span>
        </div>
        <div className='ml-3'>
          <span onClick={() => setCurrentLimit(50)} className={currentLimit == 50 ? 'bg-black text-white border px-3 py-2 rounded-md cursor-pointer ease-in-out' : 'border px-3 py-2 rounded-md cursor-pointer ease-in-out'}>50</span>
        </div>
         <div className='ml-3'>
          <span onClick={() => getTopOneHundred()} className={currentLimit == 100 ? 'bg-black text-white border px-3 py-2 rounded-md cursor-pointer ease-in-out' : 'border px-3 py-2 rounded-md cursor-pointer ease-in-out'}>100</span>
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
      <div className='h-[50vh] w-full mt-5'>
        {currentTracksValues && (
          <ResponsiveContainer width="100%" height="100%" className="bg-white">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={currentTracksValues}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}