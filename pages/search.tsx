import AccessDenied from '../components/AccessDenied';
import Layout from '../components/Layout';
import RangeFilter from '../components/search-page/RangeFilter';
import SeedFilters from '../components/search-page/SeedFilters';
import SearchInput from '../components/search-page/SearchInput';
import SongsContainer from '../components/search-page/SongsContainer';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import FlyInOutRight from '../components/animations/FlyInOutRight';
import FadeInOut from '../components/animations/FadeInOut';
import SongModal from '../components/search-page/SongModal';
import { useState } from 'react';
import { unstable_getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './api/auth/[...nextauth]';

const selectSong = (state: RootState) => state.song.currentSong;

const getMultiSelectValues = (state: RootState) => state.filters.seeds;

export default function Page({ accessToken }: { accessToken: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const song = useSelector(selectSong);
  const seedsLength = Object.entries(useSelector(getMultiSelectValues)).reduce(
    (accumulator, currentValue) => accumulator + currentValue[1].length,
    0
  );

  if (!accessToken) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className={
          isModalOpen
            ? 'bg-[#000000] flex lg:grid grid-cols-search grid-rows-search pt-10 opacity-50 pointer-events-none'
            : 'bg-[#000000] flex lg:grid grid-cols-search grid-rows-search pt-10'
        }
      >
        <FlyInOutRight>
          <div className="lg:flex flex-col items-center hidden">
            <SearchInput></SearchInput>
            <SeedFilters type="artist" queryLink="search"></SeedFilters>
            <SeedFilters type="genre" queryLink="recommendations/available-genre-seeds"></SeedFilters>
            <SeedFilters type="track" queryLink="search"></SeedFilters>
            {seedsLength > 5 && <span className="text-white">Too many selections</span>}
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
        </FlyInOutRight>
        <FadeInOut>
          <SongsContainer accessToken={accessToken}></SongsContainer>
        </FadeInOut>
      </div>
      {song?.id && window.location.href.includes('search') && (
        <SongModal updateBackground={(value: boolean) => setIsModalOpen(value)}></SongModal>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  return session
    ? {
        props: {
          accessToken: session?.accessToken,
        },
      }
    : { props: { accessToken: null } };
}
