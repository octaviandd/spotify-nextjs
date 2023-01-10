import React, { forwardRef } from 'react';

export type Ref = HTMLDivElement;

export const SongFilter = forwardRef<Ref>((props, ref) => {
  return (
    <div className="mt-2 w-full flex flex-col">
      <div className="relative w-full mt-5">
        <span className="block range-slider"></span>
        <span ref={ref} className="range-slider-thumb"></span>
      </div>
    </div>
  );
});
