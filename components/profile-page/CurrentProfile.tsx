import { useSession } from 'next-auth/react';
import React, {useState, useEffect} from 'react'
import { getSpotifyData } from '../../components/utils';
import { User } from '../../types/components';

export default function CurrentProfile() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();

  const getUserData = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: `me`,
    }).then((data): void => {
      data && setUser(data)
    });
  }

  useEffect(() => {
    session?.accessToken && getUserData();
  }, [session])

  return (
   <div className='flex items-center flex-col'>
    <img src={user?.images[0]?.url} width="200" height="200" className='rounded-full w-[200px] h-[200px] object-cover object-center' />
    {user && <div className='flex flex-col'>
      <span>{user.display_name}</span>
      <span>{user.email}</span>
      <span>{user.followers.total} </span>
    </div>}
  </div>
  )
}