import React, { MutableRefObject } from 'react';
import Image from 'next/image';
import { Swiper } from 'swiper/types';

export const SwiperButtons = ({ swiperRef }: { swiperRef: MutableRefObject<Swiper | undefined> }) => {
  return (
    <div className="flex">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="text-lg px-3 py-3 bg-[#F6F4F4] text-white w-[48px] h-[48px] flex justify-center items-center"
      >
        <Image src="/button-left.svg" width={32} height={32} />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="text-lg px-3 py-3 bg-[#F6F4F4] text-white w-[48px] h-[48px] flex justify-center items-center"
      >
        <Image src="/button-right.svg" width={32} height={32} />
      </button>
    </div>
  );
};
