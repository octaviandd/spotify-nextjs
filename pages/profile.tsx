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
import FavoriteTracks from '../components/profile-page/FavoriteTracks';
import FavoriteArtists from '../components/profile-page/FavoriteArtists';


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
      <div className="py-10">
        <div className="grid grid-cols-profile px-10">
          <div className="w-full">
            <CurrentProfile></CurrentProfile>
            <CurrentlyPlayed></CurrentlyPlayed>
          </div>
          <RecentlyPlayed></RecentlyPlayed>
        </div>
        <FollowedArtists></FollowedArtists>
        <FollowedPlaylists></FollowedPlaylists>
        <FollowedAlbums></FollowedAlbums>
        <FavoriteTracks></FavoriteTracks>
        <FavoriteArtists></FavoriteArtists>
      </div>
    </Layout>
  );
}
