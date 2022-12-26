import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import { Data, Playlist } from '../../types/components';
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
import { SwiperButtons } from '../global/SwiperButtons';

export default function FollowedArtists() {
  const [currentPlaylists, setCurrentPlaylists] = useState<Playlist[]>();
  const { data: session } = useSession();
  const swiperRef = useRef<SwiperCore>();

  useEffect(() => {
    session?.accessToken && getCurrentlyFollowed();
  }, [session]);

  const getCurrentlyFollowed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { limit: 50, offset: 0 },
      queryLink: `me/playlists`,
    }).then((data: Data): void => {
      setCurrentPlaylists(data.items);
    });
  };

  return (
    <div className="flex flex-col w-full mx-auto mt-20">
      <div className="flex items-center justify-between mb-5 px-20">
        <p className="text-xl text-white mb-6">Followed playlists</p>
        <SwiperButtons swiperRef={swiperRef}></SwiperButtons>
      </div>
      <div className="w-[100vw] flex px-20">
        <Swiper
          spaceBetween={25}
          slidesPerView={4}
          slidesPerGroup={3}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {currentPlaylists &&
            currentPlaylists.map((playlist: Playlist, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col bg-[#181818] px-3 pb-5 pt-3 rounded-lg">
                  <img
                    src={playlist?.images[0]?.url}
                    className="h-[250px] object-cover object-center cursor-grab rounded-lg"
                  />
                  <div className="flex justify-between font-artists text-xl mt-4 leading-5 text-white font-medium tracking-[-0.2px]">
                    <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[180px]">
                      {index + 1}. {playlist.name}
                    </span>
                    <div>
                      <span className="text-md">{playlist.tracks.total}</span>
                      <sup className="ml-1 text-[8px]">Tracks</sup>
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
