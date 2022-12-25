import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import { Artist, Data } from '../../types/components';
import { Swiper as SwiperCore } from 'swiper/types';
import { SwiperButtons } from '../global/SwiperButtons';
import 'swiper/css';

export default function FollowedArtists() {
  const [currentArtists, setCurrentArtists] = useState<Artist[]>();
  const { data: session } = useSession();
  const swiperRef = useRef<SwiperCore>();

  useEffect(() => {
    session?.accessToken && getCurrentlyFollowed();
  }, [session]);

  const getCurrentlyFollowed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { type: 'artist', limit: 50, offset: 0 },
      queryLink: `me/following`,
    }).then((data: Data): void => {
      data && setCurrentArtists(data?.artists?.items);
    });
  };

  return (
    <div className="flex flex-col w-full mx-auto mt-5">
      <div className="flex justify-between items-center mb-5 px-20">
        <p className="text-2xl mb-6 text-white">Followed artists</p>
        <SwiperButtons swiperRef={swiperRef}></SwiperButtons>
      </div>
      <div className="w-[100vw] flex relative px-20">
        <Swiper
          slidesPerView={4.5}
          spaceBetween={25}
          slidesPerGroup={3}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {currentArtists &&
            currentArtists.map((artist: Artist, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col">
                  <img
                    src={artist.images[1].url}
                    className="h-[250px] object-cover object-center cursor-grab rounded-lg"
                  />
                  <span className="font-artists text-xl mt-4 leading-5 text-[#010101] font-medium tracking-[-0.2px]">
                    {index}.{artist.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
