import { useSession } from 'next-auth/react';
import React, {useState, useEffect} from 'react'
import { Track } from '../search-page/types';
import { getSpotifyData } from '../utils';

export default function RecentlyPlayed() {
  const { data: session } = useSession();
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [currentLimit, setCurrentLimit] = useState(20);

  const getUserRecentlyPlayed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {limit: currentLimit, offset: 0},
      queryLink: 'me/player/recently-played'
    }).then((data: object) => {
      setRecentlyPlayed(data.items)
      let ids = data.items.map(item => item.track.id).toString();
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: {ids},
        queryLink: 'me/tracks/contains'
      }).then((data) => {
        let arrayOfBoolean = data;
        setRecentlyPlayed((prevState) => {
          let newState = prevState.map((item, index) => ({ ...item, liked: arrayOfBoolean[index] }))
          return newState
        })
      })
    })
  }

  useEffect(() => {
    session?.accessToken && getUserRecentlyPlayed();
  }, [session, currentLimit])

  return (
    <div className='px-10 pl-20'>
      <p className='text-xl mb-6'>Recently played</p>
      <div className='grid grid-cols-2 grid-rows-auto gap-x-4 gap-y-2'>
        {recentlyPlayed.length > 0 && recentlyPlayed.map((item, index) => (
          <div className='border rounded-md px-2 py-1 flex items-center justify-between' key={index}>
            <div>
              <div className='mb-1 font-semibold'>{item.track.artists[0].name}</div>
              <div className='flex items-center'>
                <div className="w-[20px] h-[20px] mr-2">
                  <img src={item.track.album?.images[2].url} className="w-[20px] h-[20px]"/>
                </div>
                <div className='text-slate-500'>
                  {item.track.name}
                </div>
              </div>
            </div>
            <div className='cursor-pointer'>
                {item.liked ? (<div>
                  <svg role="img" fill="#1ed760" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className="color-[#1ed760]"><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg>
                </div>) : (<div>
                    <svg width="16" height="16" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z" fill="#535353"/>
                    </svg>
                </div>)}
              </div>
          </div>
        ))}
      </div>
      {currentLimit < 50 && <div className='flex justify-center items-center mt-5'>
        <button className='py-2 px-5 border-2 rounded-lg text-lg' onClick={() => setCurrentLimit((limit) => limit + 10)}> + </button>
      </div>}
    </div>
  )
}