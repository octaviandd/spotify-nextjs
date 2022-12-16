import React, {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import { Artist } from '../../types/components';

export default function FollowedArtists() {
  const [currentArtists, setCurrentArtists] = useState();
  const { data: session } = useSession();

   useEffect(() => {
    session?.accessToken && getCurrentlyFollowed();
   }, [session])

  const getCurrentlyFollowed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {type: 'artist', limit: 50, offset: 0},
      queryLink: `me/following`,
    }).then((data): void => {
      console.log(data.artists.items)
      data && setCurrentArtists(data.artists.items)
    });
  }

  return (
    <div className='flex w-[50vw] mx-auto'>
        <Swiper
          spaceBetween={25}
          slidesPerView={4}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {currentArtists && currentArtists.map((artist: Artist, index: number) => (
            <SwiperSlide key={index}>
              <img src={artist.images[1].url} className="h-[250px] object-cover object-center cursor-grab"/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  )
}