import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { Data, Track } from '../../types/components';
import { getSpotifyData, millisToMinutesAndSeconds } from '../utils';
import LimitSetter from '../global/LimitSetter';
import Image from 'next/image';

export default function RecentlyPlayed() {
  const { data: session } = useSession();
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>();
  const [currentLimit, setCurrentLimit] = useState(25);

  const getUserRecentlyPlayed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { limit: currentLimit, offset: 0 },
      queryLink: 'me/player/recently-played',
    }).then((data: Data) => {
      let currentData: Track[] = data.items as Track[];
      let ids = data?.items?.map((item) => item.track.id).toString();
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: { ids, offset: 0 },
        queryLink: 'me/tracks/contains',
      }).then((data: any) => {
        setRecentlyPlayed(() => {
          let newState = currentData.map((item: Track, index: number) => ({ ...item, liked: data[index] }));
          return newState;
        });
      });
    });
  };

  useEffect(() => {
    session?.accessToken && getUserRecentlyPlayed();
  }, [session, currentLimit]);

  return (
    <div className="px-5 pl-20">
      <div className="flex items-center mb-5 justify-between max-w-[900px]">
        <div className="mb-6 text-2xl flex items-center">
          <p className="text-white">Recently played</p>
          <LimitSetter currentLimit={currentLimit} setCurrentLimit={setCurrentLimit}></LimitSetter>
        </div>
      </div>
      <div className="max-h-[620px] w-full overflow-scroll flex flex-col gap-y-1 bg-[#16181c] px-3 py-3 rounded-md">
        <div className="grid grid-cols-recentlyPlayed items-center border-b border-b-white/5 tracking-wider mb-5 pb-3 text-[#b3b3b3] text-xs">
          <span>#</span>
          <span>TITLE</span>
          <span></span>
          <span></span>
          <span>
            <Image src="/time.svg" width={16} height={16} />
          </span>
        </div>
        {recentlyPlayed &&
          recentlyPlayed.map((item, index) => (
            <div className="grid grid-cols-recentlyPlayed items-center">
              <div className="text-[#6a6a6a] col-start-1 col-end-2">
                <span>{index + 1}</span>
              </div>
              <div className="w-[40px] h-[40px]">
                <img src={item.track.album?.images[2].url} className="w-[40px] h-[40px]" />
              </div>
              <div className="flex flex-col justify-center pt-[0.3px] pb-[0.3px]">
                <span className="mb-1 font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                  {item.track.name}
                </span>
                <span className="text-[#6a6a6a]">{item.track.artists[0].name}</span>
              </div>
              <div className="cursor-pointer">
                {item.liked ? (
                  <Image src="/liked.svg" width={16} height={16} />
                ) : (
                  <Image src="/heart.svg" width={16} height={16} />
                )}
              </div>
              <div className="font-light text-sm text-[#6a6a6a] pb-1">
                {millisToMinutesAndSeconds(item.track.duration_ms)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
