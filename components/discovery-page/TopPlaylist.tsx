import React, { useState, useEffect } from 'react'
import { getSpotifyData } from '../utils';
import { useSession } from 'next-auth/react';
import { Data } from '../../types/components';

export default function TopPlaylist() {
  const [topPlaylist, setTopPlaylist] = useState();
  const [currentCountry, setCurrentCountry] = useState();
  const [currentLimit, setCurrentLimit] = useState(10);
  const { data: session } = useSession();


  const getTopPlaylist = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: currentCountry ? { country: currentCountry, limit: currentLimit } : { limit: currentLimit },
      queryLink: 'browse/categories/toplists/playlists',
    }).then((data: Data): void => {
      setTopPlaylist(data?.playlists?.items);
    });
  };

  useEffect(() => {
    session?.accessToken && getTopPlaylist();
  },[session?.accessToken])

  return (
    <div>TopPlaylist</div>
  )
}