import { useSession } from 'next-auth/react';
import React from 'react';
import AccessDenied from '../components/AccessDenied';
import Layout from '../components/Layout';
import CurrentlyPlayed from '../components/profile-page/CurrentlyPlayed';
import CurrentProfile from '../components/profile-page/CurrentProfile';
import FollowedAlbums from '../components/profile-page/FollowedAlbums';
import FollowedArtists from '../components/profile-page/FollowedArtists';
import FollowedPlaylists from '../components/profile-page/FollowedPlaylists';
import RecentlyPlayed from '../components/profile-page/RecentlyPlayed';

export default function Profile() {
  const { data: session } = useSession();

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
          <CurrentProfile></CurrentProfile>
          <CurrentlyPlayed></CurrentlyPlayed>
        </div>
        <RecentlyPlayed></RecentlyPlayed>
      </div>
      <FollowedArtists></FollowedArtists>
      <FollowedPlaylists></FollowedPlaylists>
      <FollowedAlbums></FollowedAlbums>
    </Layout>
  )
}