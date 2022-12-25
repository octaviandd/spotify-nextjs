import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react';
import { Data, Track } from '../../types/components';
import { getSpotifyData, millisToMinutesAndSeconds } from '../utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import LimitSetter from '../global/LimitSetter';
import { SwiperButtons } from '../global/SwiperButtons';
import Image from 'next/image';
import 'swiper/css';

export default function RecentlyPlayed() {
  const { data: session } = useSession();
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>();
  const [currentLimit, setCurrentLimit] = useState(25);
  const swiperRef = useRef<SwiperCore>();

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
      }).then((data) => {
        setRecentlyPlayed(() => {
          let newState = currentData.map((item: Track, index: number) => ({ ...item, liked: data[index] }));
          let chunksArray = [];
          for (let i = 0; i < newState.length; i += 10) {
            const chunk = newState.slice(i, i + 10);
            chunksArray.push(chunk);
          }
          return chunksArray;
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
        <SwiperButtons swiperRef={swiperRef}></SwiperButtons>
      </div>
      <div className="max-w-[900px] h-full">
        <Swiper
          slidesPerView={1}
          width={900}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {recentlyPlayed &&
            recentlyPlayed.map((tracks, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-y-1 bg-[#16181c] px-3 py-3 rounded-md">
                  {tracks.map((item: any, i: number) => (
                    <div className="rounded-md px-2 py-1 flex items-center justify-between " key={i}>
                      <div>
                        <div className="flex items-center">
                          <div className="text-[#6a6a6a] mr-4">{/* <span>{(i + 1) * index} </span> */}</div>
                          <div className="w-[40px] h-[40px] mr-2">
                            <img src={item.track.album?.images[2].url} className="w-[40px] h-[40px]" />
                          </div>
                          <div className="flex flex-col px-2 pt-[0.3px] pb-[0.3px]">
                            <div className="mb-1 font-normal text-white">{item.track.name}</div>
                            <div className="text-[#6a6a6a]">{item.track.artists[0].name}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="cursor-pointer">
                          {item.liked ? (
                            <Image src="/liked.svg" width={16} height={16} />
                          ) : (
                            <Image src="/heart.svg" width={16} height={16} />
                          )}
                        </div>
                        <div className="ml-4 font-light text-sm text-[#6a6a6a] pb-1">
                          {millisToMinutesAndSeconds(item.track.duration_ms)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
