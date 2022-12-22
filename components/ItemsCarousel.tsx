import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import LimitSetter from './global/LimitSetter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from './utils';
import { Data } from '../types/components';
import { useSelector } from 'react-redux';
import { SelectMenuList } from '../components/global/SelectMenuList';
import { SelectMenuOption } from '../components/global/SelectMenuOption';
import { SelectMultiValueLabel } from '../components/global/SelectMultiValueLabel';
import { RootState } from '../store';
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
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
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
        <div>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            ref={prevButtonRef}
            className="text-lg px-3 py-3 bg-[#F6F4F4] text-white w-[60px] h-[60px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 32 32">
              <path
                d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
                data-name="4-Arrow Left"
              />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            ref={nextButtonRef}
            className="text-lg px-3 py-3 bg-[#F6F4F4] text-white w-[60px] h-[60px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 32 32">
              <path
                d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z"
                data-name="3-Arrow Right"
              />
            </svg>
          </button>
        </div>
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
        <Select
          options={markets}
          onChange={(e) => setCurrentCountry(e)}
          placeholder={`Select a region`}
          styles={{
            container: (base) => ({
              ...base,
              backgroundColor: '#eee',
              border: '1px solid black',
              borderRadius: '3px',
              zIndex: '50',
              width: '200px',
            }),
          }}
          components={{
            MenuList: SelectMenuList,
            MultiValueLabel: SelectMultiValueLabel,
            Option: SelectMenuOption,
          }}
        />
      </div>
    </div>
  );
}
