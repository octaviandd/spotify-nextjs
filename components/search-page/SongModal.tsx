import { useSession } from 'next-auth/react';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getSpotifyData } from '../utils';
import { gsap } from 'gsap';
import { Artist, Data, Track } from '../../types/components';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { updateCurrentSong } from '../../store/songSlice';
import 'swiper/css';

const selectSong = (state: RootState) => state.song.currentSong;

export default function SongModal({ updateBackground }: { updateBackground: Function }) {
  const song = useSelector(selectSong);
  const [songValues, setSongValues] = useState<any>([]);
  const { data: session } = useSession();
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [currentArtist, setCurrentArtist] = useState<Artist>();
  const [currentArtistTopTracks, setCurrentArtistsTopTracks] = useState<Track[]>();
  const [similarArtists, setSimilarArtists] = useState<Artist[]>();

  useEffect(() => {
    if (song.id) {
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: undefined,
        queryLink: `audio-features/${song.id}`,
      }).then((data: object): void => {
        let values = [];
        for (const [key, value] of Object.entries(data)) {
          if (typeof value === 'number' && !key.includes('_') && key !== 'mode') {
            values.push({ name: key.charAt(0).toUpperCase() + key.slice(1), A: value.toFixed(2) });
          }
        }
        setIsVisible(true);
        updateBackground(true);
        setSongValues(values);
      });
    }
  }, [song]);

  useEffect(() => {
    if (modalRef.current) {
      let ctx = gsap.context(() => {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scaleX: 0, scaleY: 0 },
          {
            opacity: 1,
            duration: 0.5,
            scaleX: 1,
            scaleY: 1,
            transformOrigin: 'center',
          }
        );
      }, modalRef);
      return () => ctx.revert();
    }
  }, [isVisible]);

  const getArtist = (id: string) => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: `artists/${id}`,
    }).then((data: Data): void => {
      setCurrentArtist(data);
    });
  };

  const getArtistTopTracks = (id: string) => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { country: 'US' },
      queryLink: `artists/${id}/top-tracks`,
    }).then((data: Data): void => {
      setCurrentArtistsTopTracks(data.tracks);
    });
  };

  const getSimilarArtists = (id: string) => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { country: 'US' },
      queryLink: `artists/${id}/related-artists`,
    }).then((data: Data): void => {
      setSimilarArtists(data.artists);
    });
  };

  useEffect(() => {
    getArtist(song.artists[0].id);
    getArtistTopTracks(song.artists[0].id);
    getSimilarArtists(song.artists[0].id);
  }, [song]);

  if (isVisible) {
    return (
      <div
        ref={modalRef}
        className="grid grid-rows-layout fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75vw] h-auto bg-white rounded-lg drop-shadow-md"
      >
        <div className="bg-[rgba(0,0,0)] py-6 px-10 text-xl font-semibold text-white flex justify-between">
          <div>
            <span className="mr-2">{song.artists.map((artist: Artist) => artist.name)}</span>-
            <span className="ml-2">{song.name}</span>
          </div>
          <span
            className="cursor-pointer"
            onClick={() => {
              setIsVisible(false);
              updateBackground(false);
              dispatch(updateCurrentSong({}));
            }}
          >
            &times;
          </span>
        </div>
        {currentArtist && (
          <div className="px-3 py-3">
            <div className="flex">
              <div className="flex flex-col flex-start relative">
                <img
                  className="rounded-md h-[250px] w-[250px] object-cover object-center mb-4"
                  src={currentArtist.images[1]?.url}
                ></img>
                <div className="absolute bottom-[17px] w-full bg-[rgba(0,0,0,.5)] rounded-bl-md rounded-br-md flex items-center justify-between px-2">
                  <span className="bottom-[30px] left-[5px] font-semibold text-white text-lg">
                    {currentArtist.name}
                  </span>
                  <div className="flex flex-col">
                    <span className="bottom-[20px] right-[5px] font-semibold text-white text-sm flex items-center">
                      <span className="mr-1">{currentArtist.followers.total}</span>
                      <Image src="/followers.png" width={24} height={24} />
                    </span>
                    <span className="bottom-[40px] right-[5px] font-semibold text-white text-sm flex items-center">
                      {currentArtist.popularity} / 100
                      <Image src="/trending.svg" width={24} height={24} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-10">
                <p className="mb-3 text-lg">Track details:</p>
                <div className="grid grid-rows-4 grid-cols-2 gap-x-2 gap-y-2">
                  {songValues.map((value) => (
                    <div className="flex justify-between border rounded-md px-3 py-1">
                      <span className="pr-10">{value.name}</span>
                      <span className="pl-10 font-semibold">{value.A}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ml-10">
                <p className="mb-3 text-lg">Genres:</p>
                {currentArtist.genres[0].split(' ').map((genre) => (
                  <span className="bg-[#00CA4E] text-white text-md px-2 py-1 leading-5 mx-1 my-2 rounded-lg">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div className='flex gap-x-10'>
              <div className="flex flex-col">
                <p className="text-lg mb-3">Artist's top tracks:</p>
                <div className="w-[500px]">
                  <Swiper spaceBetween={10} slidesPerView={3.5} direction="horizontal">
                    {currentArtistTopTracks &&
                      currentArtistTopTracks.map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                          <div className="flex flex-col">
                            <img
                              src={item.album.images[0].url}
                              className="h-[100px] w-[100px] object-cover object-center cursor-grab rounded-lg"
                            />
                            <span className="font-artists text-sm mt-4 text-[#010101] font-semibold tracking-[-0.2px]">
                              {item.name}
                            </span>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
              <div>
                <p className="text-lg mb-3">Similar artists:</p>
                <div className="w-[500px]">
                  <Swiper spaceBetween={10} slidesPerView={3.5} direction="horizontal">
                    {similarArtists &&
                      similarArtists.map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                          <div className="flex flex-col">
                            <img
                              src={item.images[0].url}
                              className="h-[100px] w-[100px] object-cover object-center cursor-grab rounded-lg"
                            />
                            <span className="font-artists text-sm mt-4 text-[#010101] font-semibold tracking-[-0.2px]">
                              {item.name}
                            </span>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <div>'Loading...'</div>;
  }
}
