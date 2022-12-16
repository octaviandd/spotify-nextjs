import React, {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import { Album } from '../search-page/types';

export default function FollowedAlbums() {
  const [currentAlbums, setCurrentAlbums] = useState();
  const { data: session } = useSession();

   useEffect(() => {
    session?.accessToken && getCurrentlyFollowed();
   }, [session])

  const getCurrentlyFollowed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {limit: 50, offset: 0},
      queryLink: `me/albums`,
    }).then((data): void => {
      console.log(data)
      setCurrentAlbums(data.items)
    });
  }

  return (
    <div className='flex flex-col w-full mx-auto px-20 mt-20'>
      <p className='text-xl mb-6'>Followed albums</p>
      <div className='w-[80vw] flex'>
        <Swiper
          spaceBetween={25}
          slidesPerView={4}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {currentAlbums && currentAlbums.map((item: Album, index: number) => (
            <SwiperSlide key={index}>
              <img src={item.album.images[0].url} className="h-[250px] object-cover object-center cursor-grab rounded-lg"/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}