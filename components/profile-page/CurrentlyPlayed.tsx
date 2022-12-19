import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef, SetStateAction } from 'react'
import { getSpotifyData , changeTrack} from '../../components/utils';
import { Data, Track } from "../../types/components";

export default function CurrentlyPlayed() {
  const { data: session } = useSession();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track>()
  const [currentRecommended, setCurrentRecommended] = useState<Track[]>([])
  const animationRef = useRef<HTMLDivElement>(null);

  const getCurrentlyPlayed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: `me/player/currently-playing`,
    }).then((data): void => {
      data && setCurrentlyPlaying(data.item)
      data && getRecommendedSongs(data.item.id);
    });
  }

  const getRecommendedSongs = (id: string) => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { seed_tracks: id, type: 'track', limit: 3, offset: 0 },
      queryLink: 'recommendations',
    }).then((data: Data): void => {
      if (data.tracks && Object.keys(data.tracks).length > 0) {
        setCurrentRecommended(data.tracks as SetStateAction<Track[]>);
      }
    });
  }

  const skipToNextTrack = () => {
    changeTrack({token: session?.accessToken as string, type: 'next'});
  }

  const skipToPreviousTrack = () => {
    changeTrack({token: session?.accessToken as string, type: 'previous'});
  }

  useEffect(() => {
    session?.accessToken && getCurrentlyPlayed();
  }, [session?.accessToken])

  return (
    <div className='flex justify-center flex-col w-full mt-10'>
      {currentlyPlaying && <div>
        <div className='rounded-lg bg-[#333333] px-3 py-3'>
          <div className='flex items-center pr-1'>
            <div className='mr-2'>
               <img src={currentlyPlaying.album?.images[2].url} className="rounded-md w-[42px] h-[42px]" />
            </div>
            <div>
              <div>
                <span className='text-white mb-1 font-semibold'>{currentlyPlaying.name}</span>
              </div>
              <div>
                <span className='font-light text-[white]'>{currentlyPlaying.artists[0].name}</span>
              </div>
            </div>
            <div className='ml-auto pr-2'>
              <div className='cursor-pointer'>
                <div className="bounce-bars" ref={animationRef}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
          <div className='flex'>
            <div>Time elapsed</div>
            <div>
              <audio></audio>
            </div>
            <div>time remaining</div>
          </div>
          <div className='flex justify-center relative'>
            <div className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" onClick={skipToPreviousTrack} fill='white' width="40" height="40" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><path fillRule="nonzero" d="M256.01 512c-70.68 0-134.7-28.66-181.03-74.98C28.66 390.7 0 326.69 0 256.01c0-70.69 28.66-134.7 74.98-181.03C121.31 28.66 185.33 0 256.01 0S390.7 28.66 437.02 74.98C483.34 121.31 512 185.33 512 256.01s-28.66 134.69-74.98 181.01C390.7 483.34 326.69 512 256.01 512zm-11.55-242.2c-10.29-9.17-10.01-17.33 0-26.62l82.3-76.78c11.21-7.03 22.9-2.9 22.59 11.73l-.43 154.47c-.98 15.86-10.02 20.21-23.38 12.87l-81.08-75.67zm-41.69 78.99h-29.85c-5.65 0-10.27-4.65-10.27-10.28V173.47c0-5.62 4.65-10.27 10.27-10.27h29.85c5.63 0 10.28 4.62 10.28 10.27v165.04c0 5.66-4.62 10.28-10.28 10.28zM99.26 412.75c40.1 40.1 95.54 64.92 156.75 64.92 61.21 0 116.63-24.82 156.74-64.92 40.1-40.11 64.92-95.53 64.92-156.74 0-61.21-24.82-116.65-64.92-156.76-40.11-40.1-95.53-64.92-156.74-64.92-61.21 0-116.65 24.82-156.75 64.92-40.11 40.11-64.93 95.53-64.93 156.76 0 61.21 24.82 116.63 64.93 156.74z"/></svg>
            </div>
            <div className='mx-5 cursor-pointer'>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><path fillRule="nonzero" d="M255.99 0c70.68 0 134.7 28.66 181.02 74.98C483.33 121.3 512 185.31 512 256c0 70.68-28.67 134.69-74.99 181.01C390.69 483.33 326.67 512 255.99 512S121.3 483.33 74.98 437.01C28.66 390.69 0 326.68 0 256c0-70.67 28.66-134.7 74.98-181.02C121.3 28.66 185.31 0 255.99 0zm77.4 269.81c13.75-8.88 13.7-18.77 0-26.63l-110.27-76.77c-11.19-7.04-22.89-2.9-22.58 11.72l.44 154.47c.96 15.86 10.02 20.21 23.37 12.87l109.04-75.66zm79.35-170.56c-40.1-40.1-95.54-64.92-156.75-64.92-61.21 0-116.63 24.82-156.74 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.22 24.82 116.64 64.92 156.74 40.11 40.11 95.53 64.93 156.74 64.93 61.21 0 116.65-24.82 156.75-64.93 40.11-40.1 64.93-95.52 64.93-156.74 0-61.22-24.82-116.64-64.93-156.75z"/></svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" fill='white' width="40" height="40" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 511.99"><path fillRule="nonzero" d="M256 0c70.68 0 134.7 28.66 181.02 74.98C483.34 121.3 512 185.32 512 256s-28.66 134.69-74.98 181.01C390.7 483.33 326.68 511.99 256 511.99s-134.7-28.66-181.02-74.98C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.7 74.98-181.02C121.3 28.66 185.32 0 256 0zm-66.92 168.32h38.04c5.09 0 9.24 4.21 9.24 9.24v156.87c0 5.03-4.19 9.23-9.24 9.23h-38.04c-5.03 0-9.23-4.16-9.23-9.23V177.56c0-5.09 4.15-9.24 9.23-9.24zm95.77 0h38.06c5.08 0 9.23 4.2 9.23 9.24v156.87c0 5.03-4.19 9.23-9.23 9.23h-38.06c-5.04 0-9.23-4.16-9.23-9.23V177.56c0-5.09 4.16-9.24 9.23-9.24zm127.9-69.07C372.64 59.15 317.21 34.33 256 34.33c-61.21 0-116.64 24.82-156.75 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.21 24.82 116.63 64.92 156.74 40.11 40.1 95.54 64.92 156.75 64.92 61.21 0 116.64-24.82 156.75-64.92 40.1-40.11 64.92-95.53 64.92-156.74 0-61.21-24.82-116.64-64.92-156.75z"/></svg>
            </div>
            <div className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" onClick={skipToNextTrack} fill='white' width="40" height="40" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><path fillRule="nonzero" d="M255.99 0c70.68 0 134.7 28.66 181.02 74.98C483.33 121.3 512 185.31 512 256c0 70.68-28.67 134.69-74.99 181.01C390.69 483.33 326.67 512 255.99 512S121.3 483.33 74.98 437.01C28.66 390.69 0 326.68 0 256c0-70.67 28.66-134.7 74.98-181.02C121.3 28.66 185.31 0 255.99 0zm53.25 163.2h29.85c5.65 0 10.27 4.66 10.27 10.28v165.04c0 5.62-4.65 10.28-10.27 10.28h-29.85c-5.63 0-10.28-4.63-10.28-10.28V173.48c0-5.65 4.63-10.28 10.28-10.28zm-41.69 106.6c10.29-9.17 10.01-17.33 0-26.62l-82.3-76.78c-11.21-7.03-22.9-2.9-22.59 11.73l.44 154.47c.97 15.86 10.01 20.21 23.37 12.87l81.08-75.67zM412.74 99.25c-40.1-40.1-95.54-64.92-156.75-64.92-61.21 0-116.63 24.82-156.74 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.22 24.82 116.64 64.92 156.74 40.11 40.11 95.53 64.93 156.74 64.93 61.21 0 116.65-24.82 156.75-64.93 40.11-40.1 64.93-95.52 64.93-156.74 0-61.22-24.82-116.64-64.93-156.75z"/></svg>
            </div>
            <div className='absolute'>device</div>
          </div>
        </div>
        {/* <div className='border rounded-md px-2 py-1 flex items-center justify-between w-full'>
          <div>
            <div className='mb-1 font-semibold'>{currentlyPlaying.artists[0].name}</div>
            <div className='flex items-center'>
              <div className="w-[20px] h-[20px] mr-2">
                <img src={currentlyPlaying.album?.images[2].url} className="w-[20px] h-[20px]" />
              </div>
              <div className='text-slate-500'>
                {currentlyPlaying.name}
              </div>
            </div>
          </div>
          <div className='cursor-pointer'>
            <div className="bounce-bars" ref={animationRef}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div> */}
      </div>}
      {currentRecommended && <div>
        <p className='text-xl mb-6 mt-4'>Recommended tracks:</p>
        <div className='flex flex-col gap-y-1'>
          {currentRecommended.map((track, index) => (
            <div className='border rounded-md px-2 py-1 flex items-center justify-between gap-y-3' key={index}>
              <div>
                <div className='mb-1 font-semibold'>{track.artists[0].name}</div>
                <div className='flex items-center'>
                  <div className="w-[20px] h-[20px] mr-2">
                    <img src={track.album?.images[2].url} className="w-[20px] h-[20px]" />
                  </div>
                  <div className='text-slate-500'>
                    {track.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  )
}