import React, { useState, useRef, useEffect } from 'react'
import { Track } from '../../types/components';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';

export default function FavoriteTracks() {
  const { data: session } = useSession();
  const [currentTracks, setCurrentTracks] = useState<Track[]>()

  const getCurrentTracks = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {limit: 50, offset: 0},
      queryLink: `me/top/tracks`,
    }).then((data): void => {
      data && setCurrentTracks(data.items)
    });
  }

  useEffect(() => {
    session?.accessToken && getCurrentTracks();
  }, [session])

  return (
    <div>FavoriteTracks</div>
  )
}