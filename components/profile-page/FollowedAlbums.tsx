import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Album } from '../../types/components';
import { Swiper as SwiperCore } from 'swiper/types';
import { SwiperButtons } from '../global/SwiperButtons';
import 'swiper/css';

export default function FollowedAlbums({ albums }: { albums: Album[] }) {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="flex flex-col w-full mx-auto mt-20">
      <div className="flex items-center mb-5 justify-between px-5 lg:px-20">
        <p className="text-2xl mb-6 text-white">Followed albums</p>
        <SwiperButtons swiperRef={swiperRef}></SwiperButtons>
      </div>
      <div className="w-[100vw] flex px-5 lg:px-20">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: albums.length > 2 ? 1.5 : 1,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: albums.length > 2 ? 2.5 : 2,
              slidesPerGroup: 2,
            },
            920: {
              slidesPerView: albums.length > 2 ? 2.5 : 2,
              slidesPerGroup: 2,
            },
            1024: {
              slidesPerView: albums.length > 3 ? 3.5 : 3,
              slidesPerGroup: 3,
            },
            1280: {
              slidesPerView: albums.length > 4 ? 4.5 : 4,
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
          {albums.map((item: any, index: number) => (
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
