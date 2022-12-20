import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import { Album, Data } from '../../types/components';
import { Swiper as SwiperCore } from 'swiper/types';
import { SelectMenuList } from '../global/SelectMenuList';
import { SelectMenuOption } from '../global/SelectMenuOption';
import { SelectMultiValueLabel } from '../global/SelectMultiValueLabel';
import Select from 'react-select';
import LimitSetter from '../profile-page/LimitSetter';
import 'swiper/css';

export default function FeaturedAlbums() {
  const [currentAlbums, setCurrentAlbums] = useState<Album[]>();
  const { data: session } = useSession();
  const swiperRef = useRef<SwiperCore>();
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [currentCountry, setCurrentCountry] = useState<{ label: string; name: string; id: string }>();
  const [currentMarkets, setCurrentMarkets] = useState<{}[]>();
  const [currentLimit, setCurrentLimit] = useState(10);

  useEffect(() => {
    session?.accessToken && getFeaturedAlbums();
    session?.accessToken && getCurrentMarkets();
  }, [session, currentLimit]);

  const getFeaturedAlbums = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: currentCountry ? { country: currentCountry.label, limit: currentLimit } : { limit: currentLimit },
      queryLink: 'browse/new-releases',
    }).then((data: Data): void => {
      setCurrentAlbums(data?.albums?.items);
    });
  };

  const getCurrentMarkets = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: 'markets',
    }).then((data: any): void => {
      let cleanData: {}[] = [];
      data.markets.map((item: string, index: number) => {
        cleanData.push({ id: index, value: item, label: item });
      });
      setCurrentMarkets(cleanData);
    });
  };

  return (
    <div className="flex flex-col w-full mx-auto mt-20">
      <div className="flex items-center mb-5 justify-between px-20">
        <p className="text-xl mb-6">Featured albums</p>
        <div>
          <Select
            options={currentMarkets}
            onChange={(e) => setCurrentCountry(e)}
            placeholder={`Search for a region...`}
            styles={{
              container: (base) => ({
                ...base,
                backgroundColor: '#eee',
                border: '1px solid black',
                borderRadius: '3px',
                zIndex: '50',
              }),
            }}
            components={{
              MenuList: SelectMenuList,
              MultiValueLabel: SelectMultiValueLabel,
              Option: SelectMenuOption,
            }}
          />
        </div>
        <LimitSetter currentLimit={currentLimit} setCurrentLimit={setCurrentLimit}></LimitSetter>
        <div className="">
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
          {currentAlbums &&
            currentAlbums.map((item: Album, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col">
                  <img
                    src={item.images[0].url}
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
