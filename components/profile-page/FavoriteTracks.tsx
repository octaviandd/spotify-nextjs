import React, { useState, useEffect } from 'react';
import LimitSetter from '../global/LimitSetter';
import { ReactSelect } from '../global/ReactSelect';
import { Data, Track } from '../../types/components';
import { useSession } from 'next-auth/react';
import { getSpotifyData, tracksReducer } from '../utils';

const timeRangeValues = [
  { id: 0, label: 'One month', value: 'short_term' },
  { id: 1, label: 'Six months', value: 'medium_term' },
  { id: 2, label: 'All time', value: 'long_term' },
];

export default function FavoriteTracks() {
  const { data: session } = useSession();
  const [currentTracks, setCurrentTracks] = useState<Track[]>();
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentTracksValues, setCurrentTracksValues] = useState<any>();
  const [currentTimeFrame, setCurrentTimeFrame] = useState('short_term');

  const getCurrentTracks = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { limit: currentLimit, offset: 0, time_range: currentTimeFrame },
      queryLink: `me/top/tracks`,
    }).then((data: Data): void => {
      data && setCurrentTracks(data.items);
      let ids = data?.items?.map((item) => item.id);
      getSongsValues(ids as string[]);
    });
  };

  useEffect(() => {
    session?.accessToken && getCurrentTracks();
  }, [session, currentLimit, currentTimeFrame]);

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
    <div className="my-10 px-5 lg:px-20">
      <div className="flex text-xl items-center mb-6 justify-between">
        <div className="flex items-center">
          <p className="text-2xl text-white">Your top Tracks</p>
        </div>
      </div>
      <div className="flex flex-col lg:grid grid-rows-auto grid-cols-2 gap-y-1 gap-x-3 py-3 rounded-md bg-[#16181c] px-3">
        {currentTracks &&
          currentTracks.map((track, index) => (
            <div className="px-2 py-1 flex items-center justify-between" key={index}>
              <div className="flex items-center text-white">
                <div className="text-[#6a6a6a] text-[16px] mr-4">
                  <span>{index + 1}</span>
                </div>
                <div className="w-[40px] h-[40px] mr-2">
                  <img src={track.album?.images[2].url} className="w-[40px] h-[40px]" />
                </div>
                <div className="flex flex-col px-2 pt-[0.3px] pb-[0.3px]">
                  <div className="mb-1 font-normal ">{track.name}</div>
                  <div className="text-[#6a6a6a]">{track.artists[0].name}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="px-5 md:px-10 lg:px-20 flex justify-start items-center lg:justify-end mt-5">
        <ReactSelect
          options={timeRangeValues}
          setValues={setCurrentTimeFrame}
          defaultValues={{ id: 0, label: 'One month', value: 'short_term' }}
          placeholder="Timeline"
        ></ReactSelect>
        <div className="block lg:hidden">
          <LimitSetter currentLimit={currentLimit} setCurrentLimit={setCurrentLimit}></LimitSetter>
        </div>
      </div>
      <div className="w-full mt-10 py-10">
        <p className="text-[#00CA4E] text-4xl lg:text-7xl text-center font-bold">Average track</p>
        <div className="lg:ml-10 flex justify-center">
          <div className="flex flex-col md:grid grid-rows-4 grid-cols-2 gap-x-10 gap-y-2 mt-10 text-md lg:text-xl w-3/4">
            {currentTracksValues &&
              currentTracksValues.map((value: { name: string; A: number }, index: number) => (
                <div className="flex justify-between rounded-md px-3 py-1" key={index}>
                  <span className="pr-10 text-white">{value.name}</span>
                  <span className="pl-10 text-white font-semibold">{value.A}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
