import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import { CombinedAlbum, Data } from '../../types/components';
import { Swiper as SwiperCore } from 'swiper/types';
import { SwiperButtons } from '../global/SwiperButtons';
import 'swiper/css';

export default function FollowedAlbums() {
  const [currentAlbums, setCurrentAlbums] = useState<CombinedAlbum[]>();
  const { data: session } = useSession();
  const swiperRef = useRef<SwiperCore>();

  useEffect(() => {
    session?.accessToken && getCurrentAlbums();
  }, [session]);

  const getCurrentAlbums = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { limit: 50, offset: 0 },
      queryLink: `me/albums`,
    }).then((data: Data): void => {
      setCurrentAlbums(data?.items);
    });
  };

  return (
    <div className="flex flex-col w-full mx-auto mt-20">
      <div className="flex items-center mb-5 justify-between px-20">
        <p className="text-2xl mb-6 text-white">Followed albums</p>
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
          {currentAlbums &&
            currentAlbums.map((item: CombinedAlbum, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col bg-[#181818] px-3 pb-5 pt-3 rounded-lg">
                  <img
                    src={item.album.images[0].url}
                    className="h-[250px] object-cover object-center cursor-grab rounded-lg"
                  />
                  <div className="flex justify-between items-center font-artists text-xl mt-4 leading-5 text-white font-medium tracking-[-0.2px]">
                    <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[180px]">
                      {index + 1}. {item.album.name}
                    </span>
                    <div>
                      <span className="text-md">{item.album.popularity}</span>
                      <sup className="ml-1 text-[8px]">Popularity</sup>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
