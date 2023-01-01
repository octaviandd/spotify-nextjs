import React from 'react';
import AccessDenied from '../../components/AccessDenied';
import Layout from '../../components/Layout';
import ItemPage from '../../components/global/ItemPage';
import { getSpotifyData } from '../../components/utils';
import { Album, Track } from '../../types/components';
import { unstable_getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';

type Props = {
  accessToken: String;
  tracks: Track[];
  album: Album;
};

export default function AlbumPage({ album, tracks, accessToken }: Props) {
  if (!accessToken) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return <ItemPage item={album} tracks={tracks} accessToken={accessToken} title="Album"></ItemPage>;
}

export async function getServerSideProps({
  req,
  res,
  params,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  params: { slug: string };
}) {
  //@ts-ignore
  const session = await unstable_getServerSession(req, res, authOptions);

  const album = await getSpotifyData({
    token: session?.accessToken as string,
    searchParams: { offset: 0 },
    queryLink: `albums/${params.slug}`,
  });

  let ids = album?.tracks?.items.map((item) => item.id).toString();

  let validIds: any = await getSpotifyData({
    token: session?.accessToken as string,
    searchParams: { ids, offset: 0 },
    queryLink: 'me/tracks/contains',
  });

  let albumTracks = album?.tracks?.items.map((item: Track, index: number) => {
    return {
      ...item,
      liked: validIds[index],
    };
  });

  return session
    ? {
        props: {
          accessToken: session?.accessToken,
          album,
          tracks: albumTracks,
        },
      }
    : { props: { accessToken: null } };
}
