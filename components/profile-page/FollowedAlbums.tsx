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
        <p className="text-xl mb-6">Followed albums</p>
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
                <div className="flex flex-col">
                  <img
                    src={item.album.images[0].url}
                    className="h-[250px] object-cover object-center cursor-grab rounded-lg"
                  />
                  <span className="font-artists text-xl mt-4 leading-5 text-[#010101] font-medium tracking-[-0.2px]">
                    {item.album.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
