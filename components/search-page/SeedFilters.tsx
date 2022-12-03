import { useSession } from 'next-auth/react';
import React, { useEffect, useState, useRef } from 'react';
import Select, { components, MenuListProps } from 'react-select';
import { getSpotifyData } from '../utils';
import { SongResponseObject, DefaultItemTypeResponse } from './types';
import { useDispatch } from 'react-redux';
import { updateMultiSelect } from '../../store/filtersSlice';

export default function SeedFilters({ type, queryLink }: { type: string; queryLink: string }) {
  const { data: session } = useSession();
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState<SongResponseObject[]>([]);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);

  const setMultiSelectValues = (newValues: object[]) => {
    dispatch(
      updateMultiSelect({
        values: [...newValues],
        type: 'seed_' + type.toLocaleLowerCase() + 's',
      })
    );
  };

  const getData = (input?: string): void => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: type !== 'genre' ? { q: input ? input : 'm', type: type, offset, limit: 50 } : undefined,
      queryLink,
    }).then((data: DefaultItemTypeResponse) => {
      let arr: any = [];
      if (type === 'genre') {
        data.genres?.map((item, index) => {
          return arr.push({ value: index, label: item, type });
        });
      } else {
        if (type === 'artist') {
          console.log(data, 'here');
          data.artists?.items.map((item) => {
            return arr.push({
              value: item.id,
              label: item.name,
              thumb: item?.images[2]?.url ?? '',
              type,
            });
          });
        } else {
          data.tracks?.items.map((item) => {
            return arr.push({ value: item.id, label: item.name, type });
          });
        }
      }
      setOffset((offset) => offset + 50);
      setItems(items.concat(arr));
      setLoading(false);
    });
  };

  const handleChange = (input: string) => {
    if (input.length > 0) {
      getData(input);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleScroll = (e) => {
    e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && getData();
  };

  const MenuList = (props: MenuListProps) => {
    return (
      <components.MenuList {...props} innerProps={{ ...props.innerProps, onScroll: handleScroll }}>
        {props.children}
      </components.MenuList>
    );
  };

  if (isLoading) {
    return <div>"Loading..."</div>;
  }

  return (
    <div className="w-3/4 my-4">
      <Select
        isMulti
        options={items}
        onInputChange={handleChange}
        onChange={setMultiSelectValues}
        placeholder={`Search for ${type}s...`}
        components={{
          MenuList,
        }}
      />
    </div>
  );
}
