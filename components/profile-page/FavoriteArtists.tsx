import React, { useState, useEffect, useRef } from 'react';
import { Artist, Data, Track } from '../../types/components';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { SwiperButtons } from '../global/SwiperButtons';
import { ReactSelect } from '../global/ReactSelect';
import LimitSetter from '../global/LimitSetter';

const timeRangeValues = [
  { id: 0, label: 'One month', value: 'short_term' },
  { id: 1, label: 'Six months', value: 'medium_term' },
  { id: 2, label: 'All time', value: 'long_term' },
];

export default function FavoriteArtists() {
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
    <div className="my-10">
      <div className="flex text-xl items-center mb-6 justify-between px-5 lg:px-20">
        <div className="flex items-center">
          <p className="text-2xl text-white">Your top Artists</p>
          <div className="block">
            <LimitSetter currentLimit={currentLimit} setCurrentLimit={setCurrentLimit}></LimitSetter>
          </div>
        </div>
        <SwiperButtons swiperRef={swiperRef}></SwiperButtons>
      </div>
      <div className="w-[100vw] flex px-5 lg:px-20">
        {currentArtists && (
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: currentArtists.length > 2 ? 1.5 : 1,
                slidesPerGroup: 2,
              },
              768: {
                slidesPerView: currentArtists.length > 2 ? 2.5 : 2,
                slidesPerGroup: 2,
              },
              920: {
                slidesPerView: currentArtists.length > 2 ? 2.5 : 2,
                slidesPerGroup: 2,
              },
              1024: {
                slidesPerView: currentArtists.length > 3 ? 3.5 : 3,
                slidesPerGroup: 3,
              },
              1280: {
                slidesPerView: currentArtists.length > 4 ? 4.5 : 4,
                slidesPerGroup: 3,
              },
            }}
            spaceBetween={25}
            slidesPerView={1}
            slidesPerGroup={1}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {currentArtists.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col bg-[#181818] px-3 pb-4 pt-2 rounded-lg">
                  <img
                    src={item?.images[0]?.url}
                    className="h-[250px] object-cover object-center cursor-grab rounded-lg"
                  />
                  <div className="flex justify-between items-center font-artists text-xl mt-4 leading-5 text-white font-medium tracking-[-0.2px]">
                    <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[180px]">
                      {index + 1}. {item.name}
                    </span>
                    <div>
                      <span className="text-md">{item.popularity}</span>
                      <sup className="ml-1 text-[8px]">Popularity</sup>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
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
    </div>
  );
}
