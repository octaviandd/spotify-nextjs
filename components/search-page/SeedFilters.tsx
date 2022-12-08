import { useSession } from 'next-auth/react';
import React, { useEffect, useState, useCallback } from 'react';
import Select, { components, MenuListProps, OptionProps, MultiValueGenericProps, MultiValue } from 'react-select';
import { getSpotifyData, debounce } from '../utils';
import { Data, Artist, Track } from './types';
import { useDispatch } from 'react-redux';
import { updateMultiSelect } from '../../store/filtersSlice';

export default function SeedFilters({ type, queryLink }: { type: string; queryLink: string }) {
  const { data: session } = useSession();
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);

  const setMultiSelectValues = (newValues: MultiValue<any>) => {
    dispatch(
      updateMultiSelect({
        values: [...newValues],
        type: 'seed_' + type.toLocaleLowerCase() + 's',
      })
    );
  };

  const getData = (q: string = 'm'): void => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: type !== 'genre' ? { q, type: type, offset, limit: 50 } : undefined,
      queryLink,
    }).then((data: Data) => {
      let arr: any = [];
      if (type === 'genre') {
        data.genres?.map((item: any, index: number): void => {
          return arr.push({ value: index, label: item });
        });
      } else {
        if (type === 'artist') {
          data.artists?.items.map((item: Artist) => {
            return arr.push({
              value: item.id,
              label: item.name,
              thumb: item?.images[2]?.url ?? '',
            });
          });
        } else {
          data.tracks?.items.map((item: Track) => {
            return arr.push({ value: item.id, label: item.name, thumb: item.album.images[2]?.url ?? '' });
          });
        }
      }
      setOffset((offset) => offset + 50);
      setItems(items.concat(arr));
      setLoading(false);
    });
  };

  const debouncedHandleChange = useCallback(
    debounce((input) => input.length > 0 && getData(input), 500),
    []
  );

  useEffect(() => {
    getData();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    (e.target as HTMLElement).scrollHeight - (e.target as HTMLElement).scrollTop ===
      (e.target as HTMLElement).clientHeight && getData();
  };

  const MenuList = (props: MenuListProps<any, true, any>) => {
    return (
      <components.MenuList {...props} innerProps={{ ...props.innerProps, onScroll: handleScroll }}>
        {props.children}
      </components.MenuList>
    );
  };

  const Option = (props: OptionProps<any>) => {
    const { data } = props;
    return (
      <components.Option {...props}>
        <div className="flex items-center">
          {data.thumb && <img src={data.thumb} className="mr-2 w-full h-full max-w-[30px] max-h-[30px]"></img>}
          {data.label}
        </div>
      </components.Option>
    );
  };

  const MultiValueLabel = (props: MultiValueGenericProps<any, true, any>) => {
    const { data } = props;
    return (
      <components.MultiValueLabel {...props}>
        <div className="flex items-center">
          {data.thumb && (
            <img src={data.thumb} width="30" height="30" className="mr-2 w-full h-full max-w-[30px] max-h-[30px]"></img>
          )}
          {data.label}
        </div>
      </components.MultiValueLabel>
    );
  };

  if (isLoading) {
    return <div>"Loading..."</div>;
  }

  return (
    <div className="w-3/4 my-4">
      <Select
        isMulti={true}
        options={items}
        onInputChange={debouncedHandleChange}
        onChange={setMultiSelectValues}
        placeholder={`Search for ${type}s...`}
        styles={{
          container: (base) => ({
            ...base,
            backgroundColor: '#eee',
            border: '1px solid black',
            borderRadius: '3px',
          }),
        }}
        components={{
          MenuList,
          MultiValueLabel,
          Option,
        }}
      />
    </div>
  );
}
