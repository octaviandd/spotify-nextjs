import { useSession } from 'next-auth/react';
import React, { useEffect, useState, useCallback } from 'react';
import Select, { MultiValue } from 'react-select';
import { getSpotifyData, debounce } from '../utils';
import { Data, Artist, Track } from '../../types/components';
import { useDispatch } from 'react-redux';
import { updateMultiSelect } from '../../store/filtersSlice';
import { SelectMenuList } from '../global/SelectMenuList';
import { SelectMenuOption } from '../global/SelectMenuOption';
import { SelectMultiValueLabel } from '../global/SelectMultiValueLabel';

export default function SeedFilters({
  type,
  queryLink,
  accessToken,
}: {
  type: string;
  queryLink: string;
  accessToken: string;
}) {
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
      token: accessToken,
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

  const customSelectMenuList = (props: any) => {
    let newProps = { ...props, infiniteScroll: true, handleScroll: handleScroll };
    return <SelectMenuList {...newProps}></SelectMenuList>;
  };

  if (isLoading) {
    return <div>"Loading..."</div>;
  }

  return (
    <div className="w-full my-1">
      <Select
        isMulti={true}
        options={items}
        onInputChange={debouncedHandleChange}
        onChange={setMultiSelectValues}
        placeholder={`Search for ${type}s...`}
        styles={{
          multiValueRemove: (base) => ({
            ...base,
            ':hover': {
              backgroundColor: 'inherit',
            },
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: 'white',
          }),
          control: (base) => ({
            ...base,
            backgroundColor: '#16181c',
            border: 'none',
            paddingTop: '5px',
            paddingBottom: '5px',
          }),
          container: (base) => ({
            ...base,
            borderRadius: '15px',
            ':focus': {
              backgroundColor: '#1e293b',
            },
          }),
        }}
        components={{
          MenuList: customSelectMenuList,
          MultiValueLabel: SelectMultiValueLabel,
          Option: SelectMenuOption,
        }}
      />
    </div>
  );
}
