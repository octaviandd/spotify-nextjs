import React, { MutableRefObject } from 'react';
import { Swiper } from 'swiper/types';

export const SwiperButtons = ({swiperRef} : {swiperRef: MutableRefObject<Swiper | undefined>}) => {
  return (
    <div>
      <button
        onClick={() => swiperRef.current?.slidePrev()}
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
  );
};
