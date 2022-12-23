import React, { useState, useEffect } from 'react';
import { Data, Track } from '../../types/components';
import { useSession } from 'next-auth/react';
import { getSpotifyData, tracksReducer } from '../utils';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import LimitSetter from '../global/LimitSetter';

export default function FavoriteTracks() {
  const { data: session } = useSession();
  const [currentTracks, setCurrentTracks] = useState<Track[]>();
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentTracksValues, setCurrentTracksValues] = useState<any>();

  const getCurrentTracks = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { limit: currentLimit, offset: 0 },
      queryLink: `me/top/tracks`,
    }).then((data: Data): void => {
      data && setCurrentTracks(data.items);
      let ids = data?.items?.map((item) => item.id);
      getSongsValues(ids as string[]);
    });
  };

  useEffect(() => {
    session?.accessToken && getCurrentTracks();
  }, [session, currentLimit]);

  const getSongsValues = (ids: string[]) => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { ids, offset: 0 },
      queryLink: `audio-features/`,
    }).then((data: Data): void => {
      data.audio_features && setCurrentTracksValues(tracksReducer(data.audio_features));
    });
  };

  return (
    <div className="px-20 mt-4">
      <div className="flex text-xl">
        <p className="mb-6 text-xl">Favorite Songs</p>
        <LimitSetter currentLimit={currentLimit} setCurrentLimit={setCurrentLimit}></LimitSetter>
      </div>
      <div className="grid-cols-2 grid grid-rows-auto gap-y-1 gap-x-3 px-3 py-3 rounded-md bg-[#121212]">
        {currentTracks &&
          currentTracks.map((track, index) => (
            <div className="px-2 py-1 flex items-center justify-between" key={index}>
              <div>
                <div className="flex items-center">
                  <div className="w-[40px] h-[40px] mr-2">
                    <img src={track.album?.images[2].url} className="w-[40px] h-[40px]" />
                  </div>
                  <div className='flex flex-col px-2 pt-[0.3px] pb-[0.3px]'>
                    <div className="mb-1 font-normal text-white">{track.name}</div>
                    <div className="text-[#6a6a6a]">{track.artists[0].name}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="h-[50vh] w-full mt-5">
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
  );
}
