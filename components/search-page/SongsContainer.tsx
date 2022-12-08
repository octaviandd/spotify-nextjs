import React, { SetStateAction, useEffect, useState } from 'react';
import { getSpotifyData, debounce } from '../utils';
import { useSession } from 'next-auth/react';
import { Data, Track } from './types';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const selectSearch = (state: RootState) => state.search;
const selectAllFilters = (state: RootState) => state.filters;

export default function SongsContainer() {
  const { data: session } = useSession();
  const [items, setItems] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { search } = useSelector(selectSearch);
  const filters = useSelector(selectAllFilters);

  const getData = () => {
    let isDoable = false;
    let filtersArrayObject = Object.entries(filters.filters).map((item) => ({
      ['max_' + item[0]]: item[1][1],
      ['min_' + item[0]]: item[1][0],
    }));
    let filtersObject = Object.assign({}, ...filtersArrayObject);
    for (const [key, value] of Object.entries(filters.seeds)) {
      if (value.length > 0) {
        isDoable = true;
        filtersObject[key] = value;
      }
    }

    setLoading(true);
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: search ? { q: search, type: 'track', limit: 50 } : isDoable ? { ...filtersObject, limit: 50 } : undefined,
      queryLink: search ? 'search' : isDoable ? 'recommendations' : 'playlists/37i9dQZEVXbNG2KDcFcKOF',
    }).then((data: Data): void => {
      if (data.hasOwnProperty('seeds')) {
        setItems(data.tracks as SetStateAction<Track[]>);
      } else if (data.type === 'playlist') {
        let cleanArray = data.tracks?.items.map((item) => item.track);
        setItems(cleanArray as SetStateAction<Track[]>);
      } else {
        if (data.tracks && Object.keys(data.tracks).length > 0) {
          setItems(data.tracks?.items as SetStateAction<Track[]>);
        }
      }
      setLoading(false);
    });
  };

  const debouncedGetData = debounce(() => getData(), 1000);

  useEffect(() => {
    debouncedGetData();
  }, [search, filters]);

  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="grid grid-cols-item grid-rows-item gap-y-5 gap-x-3 px-4">
      {items.length > 0 &&
        items.map((item) => (
          <div key={item.id}>
            <img src={item.album.images[1]?.url}></img>
            <div className="flex flex-col flex-start pt-2">
              <span>{item.name}</span>
              <span>{item.artists[0].name}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
