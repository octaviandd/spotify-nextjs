import React, { forwardRef } from 'react';

type Props = {
  title: string;
};
export type Ref = HTMLDivElement;

export const SongFilter = forwardRef<Ref, Props>((props, ref) => {
  return (
    <div className="mt-2 w-full px-20 flex flex-col">
      <label htmlFor={props.title} className="text-white">{props.title}</label>
      <div className="relative mt-5">
        <span className="block range-slider"></span>
        <span ref={ref} className="range-slider-thumb"></span>
      </div>
    </div>
  );
});
