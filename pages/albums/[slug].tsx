import React from 'react';
import FlyInOutBottom from '../../components/animations/FlyInOutBottom';
import { getSpotifyData, millisToMinutesAndSeconds } from '../../components/utils';
import { Album, Track } from '../../types/components';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { unstable_getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';

type Props = {
  accessToken: String;
  tracks: Track[];
  album: Album;
};

export default function AlbumPage({ album, tracks }: Props) {
  return (
    <Layout>
      <FlyInOutBottom>
        <div className="px-5 pl-20 mt-10">
          <div className="flex items-center mb-5 justify-between">
            {album && (
              <div className="mb-6 text-2xl flex items-center">
                <div>
                  <img src={album.images[0].url} className="w-[300px]" />
                </div>
                <div className="px-6 flex flex-col justify-between h-full">
                  <p className="text-white">Album</p>
                  <span className="text-7xl text-white my-5">{album.name}</span>
                  <div className="text-white flex items-center">
                    <p>{album.artists[0].name}</p>
                    <span className="mx-2">•</span>
                    <p>{album.total_tracks} tracks</p>
                  </div>
                  <p>{album.popularity} popularity</p>
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-y-1 bg-[#16181c] px-3 py-3 rounded-md">
            <div className="grid grid-cols-recentlyPlayed items-center border-b border-b-white/5 tracking-wider mb-5 pb-3 text-[#b3b3b3] text-xs">
              <span>#</span>
              <span>TITLE</span>
              <span></span>
              <span></span>
              <span>
                <Image src="/time.svg" width={16} height={16} />
              </span>
            </div>
            {tracks &&
              tracks.map((item, index) => (
                <div className="grid grid-cols-recentlyPlayed items-center" key={index}>
                  <div className="text-[#6a6a6a] col-start-1 col-end-2">
                    <span>{index + 1}</span>
                  </div>
                  <div className="w-[40px] h-[40px]">
                    <img src={item.album?.images[1].url} className="w-[40px] h-[40px]" />
                  </div>
                  <div className="flex flex-col justify-center pt-[0.3px] pb-[0.3px]">
                    <span className="mb-1 font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                      {item.name}
                    </span>
                    <span className="text-[#6a6a6a]">{item.artists[0].name}</span>
                  </div>
                  <div className="cursor-pointer">
                    {item.liked ? (
                      <Image src="/liked.svg" width={16} height={16} />
                    ) : (
                      <Image src="/heart.svg" width={16} height={16} />
                    )}
                  </div>
                  <div className="font-light text-sm text-[#6a6a6a] pb-1">
                    {millisToMinutesAndSeconds(item.duration_ms)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </FlyInOutBottom>
    </Layout>
  );
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
  const session = await unstable_getServerSession(req, res, authOptions);

  const album = await getSpotifyData({
    token: session?.accessToken as string,
    searchParams: { offset: 0 },
    queryLink: `albums/${params.slug}`,
  });

  let ids = album?.tracks?.items.map((item) => item.id).toString();

  let validIds = await getSpotifyData({
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

  return {
    props: {
      accessToken: session?.accessToken,
      album,
      tracks: albumTracks,
    },
  };
}
