import React from 'react';
import FlyInOutBottom from '../../components/animations/FlyInOutBottom';
import { millisToMinutesAndSeconds } from '../../components/utils';
import { Album, Artist, Playlist, Track } from '../../types/components';
import Image from 'next/image';
import Layout from '../../components/Layout';
import AccessDenied from '../../components/AccessDenied';

type Props = {
  accessToken: String;
  tracks: Track[];
  item: Playlist | Album | Artist;
  title: string;
};

export default function ItemPage({ tracks, item, accessToken, title }: Props) {
  if (!accessToken) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <FlyInOutBottom>
        <div className="px-5 lg:pl-20 mt-10">
          <div className="flex items-center mb-5 justify-between">
            {item && (
              <div className="mb-6 text-2xl flex items-center">
                <div>
                  <img src={item.images[0].url} className="w-[300px]" />
                </div>
                <div className="px-6 flex flex-col justify-between h-full">
                  <p className="text-white">{title}</p>
                  <span className="text-2xl lg:text-7xl text-white my-5">{item.name}</span>
                  <div className="text-white flex items-center">
                    {item.owner && <p>{item.owner.display_name}</p>}
                    <span className="mx-2">•</span>
                    <p>{item.tracks.total} tracks</p>
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
            {tracks &&
              tracks.map((item, index) => (
                <div className="grid grid-cols-recentlyPlayed items-center" key={index}>
                  <div className="text-[#6a6a6a] col-start-1 col-end-2">
                    <span>{index + 1}</span>
                  </div>
                  <div className="w-[40px] h-[40px]">
                    <img
                      src={item.track ? item.track.album?.images[2].url : item.album?.images[2].url}
                      className="w-[40px] h-[40px]"
                    />
                  </div>
                  <div className="flex flex-col justify-center pt-[0.3px] pb-[0.3px]">
                    <span className="mb-1 font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px] lg:max-w-[200px]">
                      {item.track ? item.track.name : item.name}
                    </span>
                    <span className="text-[#6a6a6a]">
                      {item.track ? item.track.artists[0].name : item.artists[0].name}
                    </span>
                  </div>
                  <div className="cursor-pointer">
                    {item.liked ? (
                      <Image src="/liked.svg" width={16} height={16} />
                    ) : (
                      <Image src="/heart.svg" width={16} height={16} />
                    )}
                  </div>
                  <div className="font-light text-sm text-[#6a6a6a] pb-1">
                    {millisToMinutesAndSeconds(item.track ? item.track.duration_ms : item.duration_ms)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </FlyInOutBottom>
    </Layout>
  );
}
