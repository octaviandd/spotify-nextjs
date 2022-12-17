import React, {useState, useEffect, useRef} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import { Artist } from '../../types/components';
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css/effect-fade';

export default function FollowedArtists() {
  const [currentArtists, setCurrentArtists] = useState();
  const { data: session } = useSession();
  const swiperRef = useRef<SwiperCore>();
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null)

   useEffect(() => {
    session?.accessToken && getCurrentlyFollowed();
   }, [session])

  const getCurrentlyFollowed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {type: 'artist', limit: 50, offset: 0},
      queryLink: `me/following`,
    }).then((data): void => {
      data && setCurrentArtists(data.artists.items)
    });
  }

  return (
    <div className='flex flex-col w-full mx-auto'>
      <div className='flex justify-between items-center mb-5 px-20'>
        <p className='text-xl mb-6'>Followed artists</p>
        <div className=''>
          <button onClick={() => swiperRef.current?.slidePrev()} ref={prevButtonRef} className="text-lg px-3 py-3 bg-[#F6F4F4] text-white w-[60px] h-[60px]">
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 32 32"><path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="4-Arrow Left"/></svg>
          </button>
          <button onClick={() => swiperRef.current?.slideNext()} ref={nextButtonRef} className="text-lg px-3 py-3 bg-[#F6F4F4] text-white w-[60px] h-[60px]">
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 32 32"><path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z" data-name="3-Arrow Right"/></svg>
          </button>
        </div>
      </div>
      <div className='w-[100vw] flex relative px-20'>
        <Swiper
          slidesPerView={4.5}
          spaceBetween={25}
          slidesPerGroup={3}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {currentArtists && currentArtists.map((artist: Artist, index: number) => (
            <SwiperSlide key={index}>
              <div className='flex flex-col'>
                <img src={artist.images[1].url} className="h-[250px] object-cover object-center cursor-grab rounded-lg"/>
                <span className='font-artists text-xl mt-4 leading-5 text-[#010101] font-medium tracking-[-0.2px]'>{artist.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}