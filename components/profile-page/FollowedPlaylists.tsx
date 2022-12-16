import React, {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import { Playlist } from '../../types/components';

export default function FollowedArtists() {
  const [currentPlaylists, setCurrentPlaylists] = useState();
  const { data: session } = useSession();

   useEffect(() => {
    session?.accessToken && getCurrentlyFollowed();
   }, [session])

  const getCurrentlyFollowed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {limit: 50, offset: 0},
      queryLink: `me/playlists`,
    }).then((data): void => {
      setCurrentPlaylists(data.items)
    });
  }

  return (
    <div className='flex flex-col w-full mx-auto px-20 mt-20'>
      <p className='text-xl mb-6'>Followed playlists</p>
      <div className='w-[80vw] flex'>
        <Swiper
          spaceBetween={25}
          slidesPerView={4}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {currentPlaylists && currentPlaylists.map((playlist: Playlist, index: number) => (
            <SwiperSlide key={index}>
              <img src={playlist.images[0].url} className="h-[250px] object-cover object-center cursor-grab rounded-lg"/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}