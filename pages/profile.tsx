import { useSession } from 'next-auth/react';
import React, {useEffect, useState} from 'react';
import AccessDenied from '../components/AccessDenied';
import Layout from '../components/Layout';
import { getSpotifyData } from '../components/utils';
import { User } from '../types/components';

export default function Profile() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const getUserData = () => {
   getSpotifyData({
        token: session?.accessToken as string,
        searchParams: undefined,
        queryLink: `me`,
      }).then((data: User): void => {
        setUser(data)
      });
  }

  const getUserRecentlyPlayed = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {limit: 50, offset: 0},
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
          console.log(newState)
          return newState
        })
      })
    })
  }

  useEffect(() => {
    session?.accessToken && getUserData();
    session?.accessToken && getUserRecentlyPlayed();
  }, [session])

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='grid grid-cols-profile p-10'>
        <div className='w-full pt-10'>
          <div className='flex items-center'>
            <img src={user?.images[0]?.url} width="200" height="200" className='rounded-full w-[200px] h-[200px] object-cover object-center' />
            {user && <div className='flex flex-col'>
              <span>{user.display_name}</span>
              <span>{user.email}</span>
              <span>{user.followers.total} </span>
            </div>}
          </div>
          {/* <div className='w-full flex justify-center'>
            <h2 className='text-6xl font-bold leading-tight text-center'>&#128075; {session?.user?.name}, <br /> <span className='text-4xl text-slate-600'>here are your stats</span></h2>
          </div> */}
          <div></div>
        </div>
        <div className='px-10 pl-20'>
          <p className='text-xl mb-6'>Recently played</p>
          <div className='grid grid-cols-2 grid-rows-auto gap-x-4 gap-y-2'>
            {recentlyPlayed.length > 0 && recentlyPlayed.map((item, index) => (
              <div className='border rounded-md px-2 py-1' key={index}>
                <div className='mb-1 font-semibold'>{item.track.artists[0].name}</div>
                <div className='flex items-center'>
                  <div className="w-[20px] h-[20px] mr-2">
                    <img src={item.track.album?.images[2].url} className="w-[20px] h-[20px]"/>
                  </div>
                  <div className='text-slate-500'>
                    {item.track.name}
                  </div>
                  <div>
                    {item.liked ? 'here' : 'there'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}