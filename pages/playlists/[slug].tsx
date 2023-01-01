import React from 'react';
import Layout from '../../components/Layout';
import AccessDenied from '../../components/AccessDenied';
import ItemPage from '../../components/global/ItemPage';
import { getSpotifyData } from '../../components/utils';
import { Playlist, Track } from '../../types/components';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

type Props = {
  accessToken: String;
  tracks: Track[];
  playlist: Playlist;
};

export default function PlaylistPage({ tracks, playlist, accessToken }: Props) {
  if (!accessToken) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return <ItemPage item={playlist} tracks={tracks} accessToken={accessToken} title="Playlist"></ItemPage>;
}

export async function getServerSideProps({
  res,
  req,
  params,
}: {
  res: NextApiResponse;
  req: NextApiRequest;
  params: { slug: string };
}) {
  //@ts-ignore
  const session = await unstable_getServerSession(req, res, authOptions);

  const playlist = await getSpotifyData({
    token: session?.accessToken as string,
    searchParams: { offset: 0, limit: 50 },
    queryLink: `playlists/${params.slug}`,
  });

  let ids = playlist?.tracks?.items
    .slice(0, 50)
    .map((item) => item.track.id)
    .toString();

  let validIds: any = await getSpotifyData({
    token: session?.accessToken as string,
    searchParams: { ids, offset: 0 },
    queryLink: 'me/tracks/contains',
  });

  let cleanPlaylists = playlist?.tracks?.items.slice(0, 50).map((item: Track, index: number) => {
    return {
      ...item,
      liked: validIds[index],
    };
  });

  return session
    ? {
        props: {
          accessToken: session?.accessToken,
          tracks: cleanPlaylists,
          playlist,
        },
      }
    : { props: { accessToken: null } };
}
