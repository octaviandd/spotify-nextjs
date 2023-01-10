import React, { forwardRef } from 'react';
import Image from 'next/image';

interface Props {
  item: {
    link: string;
    title: string;
    artist: string;
    id?: string;
  };
}

export type Ref = HTMLDivElement;

export const SongCard = forwardRef<Ref, Props>((props, ref) => {
  return (
    <div className="relative group w-[60px]" ref={ref}>
      <div className="relative">
        <a className="w-full h-full">
          <img
            src={props.item.link}
            className="group-hover:opacity-40 rounded-lg transition ease-in-out"
            width="100%"
            height="100%"
          />
          <div className="hidden z-10 absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:block transition-all ease-in-out duration-500">
            <Image src="/Spotify_Icon_RGB_Green.png" width="52" height="52" />
          </div>
        </a>
      </div>
    </div>
  );
});
