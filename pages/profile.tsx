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
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { getSpotifyData } from '../components/utils';
import { Album, Artist, Playlist, User } from '../types/components';
import type { NextApiRequest, NextApiResponse } from 'next';

type Props = {
  profile: User;
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
  accessToken: String | null;
};

export default function Profile({ profile, albums, artists, playlists, accessToken }: Props) {
  if (!accessToken) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-10">
        <div className="flex flex-col lg:grid grid-cols-profile px-10">
          <div className="w-full mb-5 lg:mb-0">
            <CurrentProfile profile={profile}></CurrentProfile>
            <CurrentlyPlayed></CurrentlyPlayed>
          </div>
          <RecentlyPlayed></RecentlyPlayed>
        </div>
        <FavoriteArtists></FavoriteArtists>
        <FavoriteTracks></FavoriteTracks>
        <FollowedArtists artists={artists}></FollowedArtists>
        <FollowedPlaylists playlists={playlists}></FollowedPlaylists>
        <FollowedAlbums albums={albums}></FollowedAlbums>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  //@ts-ignore
  const session = await unstable_getServerSession(req, res, authOptions);

  const profileData = await getSpotifyData({
    token: session?.accessToken as string,
    searchParams: undefined,
    queryLink: `me`,
  });

  const featuredAlbums = await getSpotifyData({
    token: session?.accessToken as string,
    searchParams: { limit: 50, offset: 0 },
    queryLink: `me/albums`,
  });

  const followedArtists = await getSpotifyData({
    token: session?.accessToken as string,
    searchParams: { type: 'artist', limit: 50, offset: 0 },
    queryLink: `me/following`,
  });

  const followedPlaylists = await getSpotifyData({
    token: session?.accessToken as string,
    searchParams: { limit: 50, offset: 0 },
    queryLink: `me/playlists`,
  });

  return session
    ? {
        props: {
          accessToken: session?.accessToken,
          profile: profileData,
          albums: featuredAlbums.items,
          artists: followedArtists?.artists?.items,
          playlists: followedPlaylists.items,
        },
      }
    : { props: { accessToken: null } };
}
