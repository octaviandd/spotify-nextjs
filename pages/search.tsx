import { useSession } from 'next-auth/react';
import AccessDenied from '../components/AccessDenied';
import Layout from '../components/Layout';
import RangeFilter from '../components/search-page/RangeFilter';
import SeedFilters from '../components/search-page/SeedFilters';
import SearchInput from '../components/search-page/SearchInput';
import SongsContainer from '../components/search-page/SongsContainer';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

const getMultiSelectValues = (state: RootState) => state.filters.seeds;

export default function Page() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const seedsLength = Object.entries(useSelector(getMultiSelectValues)).reduce((accumulator, currentValue) => {
    return accumulator + currentValue[1].length;
  }, 0);

  if (typeof window !== 'undefined' && loading) return null;

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-search grid-rows-search pt-10">
        <div className="flex flex-col items-center">
          <SearchInput></SearchInput>
          <SeedFilters type="artist" queryLink="search"></SeedFilters>
          <SeedFilters type="genre" queryLink="recommendations/available-genre-seeds"></SeedFilters>
          <SeedFilters type="track" queryLink="search"></SeedFilters>
          {seedsLength > 5 && 'Too many selections'}
          <RangeFilter type="Acousticness" max={100} min={0}></RangeFilter>
          <RangeFilter type="Danceability" max={100} min={0}></RangeFilter>
          <RangeFilter type="Duration" max={100} min={0}></RangeFilter>
          <RangeFilter type="Energy" max={100} min={0}></RangeFilter>
          <RangeFilter type="Instrumentalness" max={100} min={0}></RangeFilter>
          <RangeFilter type="Key" max={100} min={0}></RangeFilter>
          <RangeFilter type="Liveness" max={100} min={0}></RangeFilter>
          <RangeFilter type="Loudness" max={100} min={0}></RangeFilter>
          <RangeFilter type="Mode" max={100} min={0}></RangeFilter>
          <RangeFilter type="Popularity" max={100} min={0}></RangeFilter>
          <RangeFilter type="Speechiness" max={100} min={0}></RangeFilter>
          <RangeFilter type="Tempo" max={100} min={0}></RangeFilter>
          <RangeFilter type="Valence" max={100} min={0}></RangeFilter>
        </div>
        <SongsContainer></SongsContainer>
      </div>
    </Layout>
  );
}
