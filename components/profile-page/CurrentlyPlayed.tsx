import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef, SetStateAction } from 'react';
import { getSpotifyData, changeTrack, playPauseTrack } from '../../components/utils';
import { Data, Track } from '../../types/components';
import Image from "next/image"

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
    <div className="flex justify-center flex-col w-full mt-10">
      {currentlyPlaying && (
        <div>
          <div className="rounded-lg bg-[#333333] px-3 py-3">
            <div className="flex items-center pr-1">
              <div className="mr-2">
                <img src={currentlyPlaying.album?.images[2].url} className="rounded-md w-[42px] h-[42px]" />
              </div>
              <div>
                <div>
                  <span className="text-white mb-1 font-semibold">{currentlyPlaying.name}</span>
                </div>
                <div>
                  <span className="font-light text-[white]">{currentlyPlaying.artists[0].name}</span>
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
            {/* <div className='flex'>
            <div>Time elapsed</div>
            <div>
              <audio></audio>
            </div>
            <div>time remaining</div>
          </div> */}
            <div className="flex justify-center relative mt-5">
              <div className="cursor-pointer">
                <Image src="/skip-previous.svg" width={40} height={40} onClick={skipToPreviousTrack} />
              </div>
              <div className="mx-5 cursor-pointer">
                {!currentlyPlaying.isPlaying && (
                  <Image src="/play.svg" width={40} height={40} onClick={resumeTrack} />
                )}
                {currentlyPlaying.isPlaying && (
                  <Image src="/pause.svg" width={40} height={40} onClick={pauseTrack} />
                )}
              </div>
              <div className="cursor-pointer">
                <Image src="/skip-next.svg" width={40} height={40} onClick={skipToNextTrack} />
              </div>
              {/* <div className='absolute'>device</div> */}
            </div>
          </div>
        </div>
      )}
      {currentRecommended && (
        <div>
          <p className="text-xl mb-6 mt-4">Recommended tracks:</p>
          <div className="flex flex-col gap-y-1">
            {currentRecommended.map((track, index) => (
              <div className="border rounded-md px-2 py-1 flex items-center justify-between gap-y-3" key={index}>
                <div>
                  <div className="mb-1 font-normal">{track.name}</div>
                  <div className="flex items-center">
                    <div className="w-[20px] h-[20px] mr-2">
                      <img src={track.album?.images[2].url} className="w-[20px] h-[20px]" />
                    </div>
                    <div className="text-[#6a6a6a]">{track.artists[0].name}</div>
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
