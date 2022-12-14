import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Artist } from '../../types/components';
import { Swiper as SwiperCore } from 'swiper/types';
import { SwiperButtons } from '../global/SwiperButtons';
import 'swiper/css';

export default function FollowedArtists({ artists }: { artists: Artist[] }) {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="flex flex-col w-full mx-auto mt-5">
      <div className="flex justify-between items-center mb-5 px-5 lg:px-20">
        <p className="text-2xl mb-6 text-white">Followed artists</p>
        <SwiperButtons swiperRef={swiperRef}></SwiperButtons>
      </div>
      <div className="w-[100vw] flex relative px-5 lg:px-20">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: artists.length > 2 ? 1.5 : 1,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: artists.length > 2 ? 2.5 : 2,
              slidesPerGroup: 2,
            },
            920: {
              slidesPerView: artists.length > 2 ? 2.5 : 2,
              slidesPerGroup: 2,
            },
            1024: {
              slidesPerView: artists.length > 3 ? 3.5 : 3,
              slidesPerGroup: 3,
            },
            1280: {
              slidesPerView: artists.length > 4 ? 4.5 : 4,
              slidesPerGroup: 3,
            },
          }}
          slidesPerView={1}
          spaceBetween={25}
          slidesPerGroup={1}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {artists.map((artist: Artist, index: number) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col bg-[#181818] px-3 pb-5 pt-3 rounded-lg">
                <img
                  src={artist?.images[0]?.url}
                  className="h-[250px] object-cover object-center cursor-grab rounded-lg"
                />
                <div className="flex justify-between font-artists text-xl mt-4 leading-5 text-white font-medium tracking-[-0.2px]">
                  <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[180px]">
                    {index + 1}. {artist.name}
                  </span>
                  <div>
                    <span className="text-md">{artist.popularity}</span>
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
