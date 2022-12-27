import React, { useEffect, useState } from 'react';
import FlyInOutBottom from '../../components/animations/FlyInOutBottom';
import { useRouter } from 'next/router';
import { getSpotifyData, millisToMinutesAndSeconds } from '../../components/utils';
import { useSession } from 'next-auth/react';
import { Data, Playlist, Track } from '../../types/components';
import Image from 'next/image';
import Layout from '../../components/Layout';

export default function ArtistPage() {
  const query = useRouter().query;
  const { data: session } = useSession();
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>();
  const [playlist, setPlaylist] = useState<Playlist>();
  const [loading, setLoading] = useState(true);

  const getPlaylistTracks = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { offset: 0 },
      queryLink: `playlists/${query.slug}`,
    }).then((data: Data) => {
      setPlaylist(data as any);
      let currentData: Track[] = data?.tracks?.items as Track[];
      let ids = data?.tracks?.items
        .slice(0, 50)
        .map((item) => item.track.id)
        .toString();
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: { ids, offset: 0 },
        queryLink: 'me/tracks/contains',
      }).then((data: any) => {
        setPlaylistTracks(() => currentData.map((item: Track, index: number) => ({ ...item, liked: data[index] })));
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    session?.accessToken && getPlaylistTracks();
  }, [session?.accessToken]);

  if (loading) {
    return <Layout>
      <div className="h-[100vh] w-full bg-black"></div>;
    </Layout>
  }

  return (
    <Layout>
      <FlyInOutBottom>
        <div className="px-5 pl-20 mt-10">
          <div className="flex items-center mb-5 justify-between">
            {playlist && (
              <div className="mb-6 text-2xl flex items-center">
                <div>
                  <img src={playlist.images[0].url} className="w-[300px]" />
                </div>
                <div className="px-6 flex flex-col justify-between h-full">
                  <p className="text-white">Playlist</p>
                  <span className="text-7xl text-white my-5">{playlist.name}</span>
                  <div className="text-white flex items-center">
                    <p>{playlist.owner.display_name}</p>
                    <span className="mx-2">•</span>
                    <p>{playlist.tracks.total} tracks</p>
                  </div>
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
            {playlistTracks &&
              playlistTracks.map((item, index) => (
                <div className="grid grid-cols-recentlyPlayed items-center" key={index}>
                  <div className="text-[#6a6a6a] col-start-1 col-end-2">
                    <span>{index + 1}</span>
                  </div>
                  <div className="w-[40px] h-[40px]">
                    <img src={item.track.album?.images[2].url} className="w-[40px] h-[40px]" />
                  </div>
                  <div className="flex flex-col justify-center pt-[0.3px] pb-[0.3px]">
                    <span className="mb-1 font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                      {item.track.name}
                    </span>
                    <span className="text-[#6a6a6a]">{item.track.artists[0].name}</span>
                  </div>
                  <div className="cursor-pointer">
                    {item.liked ? (
                      <Image src="/liked.svg" width={16} height={16} />
                    ) : (
                      <Image src="/heart.svg" width={16} height={16} />
                    )}
                  </div>
                  <div className="font-light text-sm text-[#6a6a6a] pb-1">
                    {millisToMinutesAndSeconds(item.track.duration_ms)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </FlyInOutBottom>
    </Layout>
  );
}
