import React, { useEffect, useRef, useState } from 'react';
import FlyInOutRight from '../animations/FlyInOutRight';
import SearchInput from './SearchInput';
import RangeFilter from './RangeFilter';
import SeedFilters from './SeedFilters';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxStore';
import MobileSearch from './MobileSearch';
import { useWindowSize } from './useWindowSize';
import { gsap } from 'gsap';
import { NextApiRequest, NextApiResponse } from 'next';

type Props = {
  accessToken: string;
};

const getMultiSelectValues = (state: RootState) => state.filters.seeds;

export default function Search({ accessToken }: Props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const seedsLength = Object.entries(useSelector(getMultiSelectValues)).reduce(
    (accumulator, currentValue) => accumulator + currentValue[1].length,
    0
  );

  const handleOpen = () => {
    let navBarElHeight = document.querySelector('#main-nav')?.clientHeight;

    if (isOpen) {
      setIsOpen(false);
      gsap.to(ref.current, { duration: 0.5, top: '90%', ease: 'power2.out' });
    } else {
      setIsOpen(true);
      gsap.to(ref.current, { duration: 0.5, top: 0, ease: 'power2.out' });
    }
  };

  const size = useWindowSize();

  if (size.width < 768) {
    return (
      <div className="fixed top-[90%] w-[100vw] flex flex-col z-50 overflow-scroll h-full" ref={ref}>
        <div style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} className="px-5 py-4">
          <SearchInput isOpen={isOpen} handleOpen={handleOpen} hidden={false}></SearchInput>
        </div>
        <div className="bg-black px-5 py-4">
          <SeedFilters type="artist" queryLink="search" accessToken={accessToken}></SeedFilters>
          <SeedFilters
            type="genre"
            queryLink="recommendations/available-genre-seeds"
            accessToken={accessToken}
          ></SeedFilters>
          <SeedFilters type="track" queryLink="search" accessToken={accessToken}></SeedFilters>
          {seedsLength > 5 && <span className="text-white">Too many selections</span>}
          <div className="mt-4">
            <RangeFilter type="Acousticness" max={1} min={0}></RangeFilter>
            <RangeFilter type="Danceability" max={1} min={0}></RangeFilter>
            <RangeFilter type="Duration_ms" max={600000} min={0}></RangeFilter>
            <RangeFilter type="Energy" max={1} min={0}></RangeFilter>
            <RangeFilter type="Instrumentalness" max={1} min={0}></RangeFilter>
            <RangeFilter type="Key" max={11} min={0}></RangeFilter>
            <RangeFilter type="Liveness" max={1} min={0}></RangeFilter>
            <RangeFilter type="Loudness" max={100} min={-10}></RangeFilter>
            <RangeFilter type="Mode" max={1} min={0}></RangeFilter>
            <RangeFilter type="Popularity" max={100} min={0}></RangeFilter>
            <RangeFilter type="Speechiness" max={1} min={0}></RangeFilter>
            <RangeFilter type="Tempo" max={350} min={-50}></RangeFilter>
            <RangeFilter type="Valence" max={1} min={0}></RangeFilter>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="lg:flex flex-col items-center hidden">
        <SearchInput isOpen={isOpen} handleOpen={setIsOpen} hidden={true}></SearchInput>
        <SeedFilters type="artist" queryLink="search" accessToken={accessToken}></SeedFilters>
        <SeedFilters
          type="genre"
          queryLink="recommendations/available-genre-seeds"
          accessToken={accessToken}
        ></SeedFilters>
        <SeedFilters type="track" queryLink="search" accessToken={accessToken}></SeedFilters>
        {seedsLength > 5 && <span className="text-white">Too many selections</span>}
        <div className="px-2 w-full">
          <RangeFilter type="Acousticness" max={1} min={0}></RangeFilter>
          <RangeFilter type="Danceability" max={1} min={0}></RangeFilter>
          <RangeFilter type="Duration_ms" max={600000} min={0}></RangeFilter>
          <RangeFilter type="Energy" max={1} min={0}></RangeFilter>
          <RangeFilter type="Instrumentalness" max={1} min={0}></RangeFilter>
          <RangeFilter type="Key" max={11} min={0}></RangeFilter>
          <RangeFilter type="Liveness" max={1} min={0}></RangeFilter>
          <RangeFilter type="Loudness" max={100} min={-10}></RangeFilter>
          <RangeFilter type="Mode" max={1} min={0}></RangeFilter>
          <RangeFilter type="Popularity" max={100} min={0}></RangeFilter>
          <RangeFilter type="Speechiness" max={1} min={0}></RangeFilter>
          <RangeFilter type="Tempo" max={350} min={-50}></RangeFilter>
          <RangeFilter type="Valence" max={1} min={0}></RangeFilter>
        </div>
      </div>
    );
  }
}
