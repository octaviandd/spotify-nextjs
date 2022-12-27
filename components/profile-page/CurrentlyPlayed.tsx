import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react';
import { getSpotifyData, changeTrack, playPauseTrack } from '../../components/utils';
import { Data, Track } from '../../types/components';
import Image from 'next/image';

export default function CurrentlyPlayed() {
  const { data: session } = useSession();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track & { isPlaying: boolean }>();
  const [currentRecommended, setCurrentRecommended] = useState<Track[]>();
  const animationRef = useRef<HTMLDivElement>(null);

  const getCurrentlyPlayed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: `me/player/currently-playing`,
    }).then((data: Data): void => {
      data?.item && setCurrentlyPlaying({ ...data.item, isPlaying: data.is_playing as boolean });
      data?.item && getRecommendedSongs(data?.item?.id as string);
    });
  };

  const getRecommendedSongs = (id: string) => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { seed_tracks: id, type: 'track', limit: 3, offset: 0 },
      queryLink: 'recommendations',
    }).then((data: Data): void => {
      if (data.tracks && Object.keys(data.tracks).length > 0) {
        setCurrentRecommended(data.tracks as unknown as Track[]);
      }
    });
  };

  const skipToNextTrack = async () => {
    await changeTrack({ token: session?.accessToken as string, type: 'next' });
    getCurrentlyPlayed();
  };

  const skipToPreviousTrack = async () => {
    await changeTrack({ token: session?.accessToken as string, type: 'previous' });
    getCurrentlyPlayed();
  };

  const pauseTrack = async () => {
    await playPauseTrack({ token: session?.accessToken as string, type: 'pause' });
    getCurrentlyPlayed();
  };

  const resumeTrack = async () => {
    await playPauseTrack({ token: session?.accessToken as string, type: 'play' });
    getCurrentlyPlayed();
  };

  useEffect(() => {
    session?.accessToken && getCurrentlyPlayed();
  }, [session?.accessToken]);

  return (
    <div className="flex justify-center rounded-lg flex-col w-full mt-10 bg-[#16181c]">
      {currentlyPlaying && (
        <div className="rounded-tr-lg rounded-tl-lg px-3 py-3">
          <div className="flex items-center pr-1">
            <div className="mr-2">
              <img src={currentlyPlaying.album?.images[2].url} className="rounded-md w-[42px] h-[42px]" />
            </div>
            <div>
              <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[225px]">
                <span className="text-white mb-1">{currentlyPlaying.name}</span>
              </div>
              <div>
                <span className="font-light text-[#6a6a6a]">{currentlyPlaying.artists[0].name}</span>
              </div>
            </div>
            <div className="ml-auto pr-2">
              <div className="cursor-pointer">
                {currentlyPlaying.isPlaying && (
                  <div className="bounce-bars" ref={animationRef}>
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center relative mt-5">
            <div className="cursor-pointer">
              <Image src="/skip-previous.svg" width={40} height={40} onClick={skipToPreviousTrack} />
            </div>
            <div className="mx-5 cursor-pointer">
              {!currentlyPlaying.isPlaying && <Image src="/play.svg" width={40} height={40} onClick={resumeTrack} />}
              {currentlyPlaying.isPlaying && <Image src="/pause.svg" width={40} height={40} onClick={pauseTrack} />}
            </div>
            <div className="cursor-pointer">
              <Image src="/skip-next.svg" width={40} height={40} onClick={skipToNextTrack} />
            </div>
          </div>
        </div>
      )}
      <div className="h-[0.5px] w-full bg-white my-5"></div>
      {currentRecommended && (
        <div className="px-3 py-3 rounded-br-md rounded-bl-md">
          <div className="flex flex-col gap-y-1">
            {currentRecommended.map((track, index) => (
              <div className="px-2 py-1 flex items-center justify-between gap-y-3" key={index}>
                <div>
                  <div className="flex items-center">
                    <div className="text-[#6a6a6a] mr-4">
                      <span>{index + 1}</span>
                    </div>
                    <div className="w-[40px] h-[40px] mr-2">
                      <img src={track.album?.images[2].url} className="w-[40px] h-[40px]" />
                    </div>
                    <div className="flex flex-col px-2 pt-[0.3px] pb-[0.3px]">
                      <div className="mb-1 font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap max-w-[175px]">
                        {track.name}
                      </div>
                      <div className="text-[#6a6a6a]">{track.artists[0].name}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
