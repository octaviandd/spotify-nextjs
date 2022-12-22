import React, { useState, useEffect, useRef } from 'react';
import { Data, Track } from '../../types/components';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { SwiperButtons } from './SwiperButtons';
import { ReactSelect } from "../global/ReactSelect"
import LimitSetter from '../global/LimitSetter';

const timeRangeValues = [
  { id: 0, label: 'One month', value: 'short_term' },
  { id: 1, label: 'Six months', value: 'medium_term' },
  { id: 2, label: 'All time', value: 'long_term' },
];

export default function FavoriteTracks() {
  const { data: session } = useSession();
  const [currentArtists, setCurrentArtists] = useState<Track[]>();
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentTimeFrame, setCurrentTimeFrame] = useState('short_term');
  const swiperRef = useRef<SwiperCore>();

  const getCurrentArtists = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { limit: currentLimit, offset: 0, time_range: currentTimeFrame },
      queryLink: `me/top/artists`,
    }).then((data: Data): void => {
      data && setCurrentArtists(data.items);
    });
  };

  useEffect(() => {
    session?.accessToken && getCurrentArtists();
  }, [session, currentLimit, currentTimeFrame]);

  return (
    <div className="mt-4">
      <div className="flex text-xl items-center mb-6 justify-between px-20">
        <div className="flex items-center">
          <p className="text-xl">Your top Artists</p>
          <LimitSetter currentLimit={currentLimit} setCurrentLimit={setCurrentLimit}></LimitSetter>
          <ReactSelect options={timeRangeValues} setValues={setCurrentTimeFrame} defaultValues={{ id: 0, label: 'One month', value: 'short_term' }} placeholder="Timeline"></ReactSelect>
        </div>
        <SwiperButtons swiperRef={swiperRef}></SwiperButtons>
      </div>
      <div className="w-[100vw] flex px-20">
        <Swiper
          spaceBetween={25}
          slidesPerView={4.5}
          slidesPerGroup={3}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {currentArtists &&
            currentArtists.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col">
                  <img
                    src={item.images ? item?.images[0]?.url : item?.icons[0]?.url}
                    className="h-[250px] object-cover object-center cursor-grab rounded-lg"
                  />
                  <span className="font-artists text-xl mt-4 leading-5 text-[#010101] font-medium tracking-[-0.2px]">
                    {item.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
