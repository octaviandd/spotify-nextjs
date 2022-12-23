import React, { useState, useEffect, useRef } from 'react';
import LimitSetter from './LimitSetter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import { Data } from '../../types/components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SwiperButtons } from './SwiperButtons';
import { ReactSelect } from "./ReactSelect"
import 'swiper/css';

const getMarkets = (state: RootState) => state.markets;

type Props = {
  endpoint: string;
  title: string;
};

export default function ItemsCarousel({ endpoint, title }: Props) {
  const [data, setData] = useState<any[]>();
  const { data: session } = useSession();
  const [currentCountry, setCurrentCountry] = useState();
  const [currentLimit, setCurrentLimit] = useState(10);
  const swiperRef = useRef<SwiperCore>();
  const markets = useSelector(getMarkets).markets;

  const getData = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: currentCountry ? { country: currentCountry, limit: currentLimit } : { limit: currentLimit },
      queryLink: endpoint,
    }).then((data: Data): void => {
      if (title === 'Featured Categories') {
        setData(data?.categories?.items);
      } else if (title === 'Featured Albums') {
        setData(data?.albums?.items);
      } else {
        setData(data?.playlists?.items);
      }
    });
  };

  useEffect(() => {
    session?.accessToken && getData();
  }, [session?.accessToken, currentLimit, currentCountry]);

  return (
    <div className="flex flex-col w-full mx-auto mt-20">
      <div className="flex items-center mb-5 justify-between px-20">
        <div className="flex text-xl">
          <p className="mb-6 text-xl">{title}</p>
          <LimitSetter currentLimit={currentLimit} setCurrentLimit={setCurrentLimit}></LimitSetter>
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
          {data &&
            data.map((item: any, index: number) => (
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
      <div className="px-20 flex justify-end mt-5">
        <ReactSelect options={markets} placeholder="Select a region" setValues={setCurrentCountry} defaultValues={undefined}></ReactSelect>
      </div>
    </div>
  );
}