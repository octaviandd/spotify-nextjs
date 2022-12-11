import React, { SetStateAction, useEffect, useState, useCallback } from 'react';
import { getSpotifyData, debounce } from '../utils';
import { useSession } from 'next-auth/react';
import { Data, Track } from './types';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { FiltersInitialState } from '../../store/filtersSlice';
import Image from 'next/image';
import { updateCurrentSong } from '../../store/songSlice';

const selectSearch = (state: RootState) => state.search;
const selectAllFilters = (state: RootState) => state.filters;

export default function SongsContainer() {
  const [items, setItems] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const filters = useSelector(selectAllFilters);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const { search } = useSelector(selectSearch);
  const { data: session } = useSession();

  const setSong = (track: Track) => {
    dispatch(updateCurrentSong({ value: track }));
  };

  const getData = (filters: FiltersInitialState) => {
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
      searchParams: search
        ? { q: search, type: 'track', limit: 50 }
        : isDoable
        ? { ...filtersObject, limit: 50, offset: offset }
        : undefined,
      queryLink: search ? 'search' : isDoable ? 'recommendations' : 'playlists/37i9dQZEVXbNG2KDcFcKOF',
    }).then((data: Data): void => {
      if (data.hasOwnProperty('seeds')) {
        setItems(data.tracks as SetStateAction<Track[]>);

        setOffset((offset) => offset + 50);
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

  const debouncedGetData = useCallback(
    debounce((filters) => getData(filters), 1000),
    []
  );

  useEffect(() => {
    debouncedGetData(filters);
  }, [search, filters]);

  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="grid grid-cols-item grid-rows-item gap-y-5 gap-x-3 px-4">
      {items.length > 0 &&
        items.map((item) => (
          <div key={item.id} className="relative group">
            <div className="relative">
              <a className=" w-full h-full">
                <img
                  src={item.album.images[1]?.url}
                  className="group-hover:opacity-40 transition ease-in-out"
                  width="100%"
                  height="100%"
                />
                <div
                  onClick={() => setSong(item)}
                  className="hidden z-10 absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:block transition ease-in-out delay-150"
                >
                  <Image src="/Spotify_Icon_RGB_Black.png" width="52" height="52" />
                </div>
              </a>
            </div>
            <div className="flex flex-col flex-start pt-2">
              <span className="">{item.name}</span>
              <span className="text-gray-500">{item.artists[0].name}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
